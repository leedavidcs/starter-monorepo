import { prisma } from "@app/server/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import produce from "immer";
import type { NextApiHandler } from "next";
import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

const authHandler: NextApiHandler = (req, res) =>
	NextAuth(req, res, {
		adapter: PrismaAdapter(prisma),
		callbacks: {
			jwt: async ({ account, token }) => {
				const accessToken = account?.access_token;

				if (!accessToken) return token;

				return produce(token, (newToken) => {
					newToken.accessToken = accessToken;

					return newToken;
				});
			},
			session: ({ session, token }) => {
				return produce(session, (newSession) => {
					newSession.accessToken = token.accessToken;

					newSession.user = produce(session.user, (newUser) => {
						newUser.accessToken = token.accessToken;
						newUser.id = token.sub;

						return newUser;
					});

					return newSession;
				});
			}
		},
		events: {
			signIn: async (params) => {
				const { account, profile, isNewUser } = params;

				if (!profile) return;

				await prisma.user
					.update({
						where: { email: profile.email },
						data: {
							accounts: {
								update: {
									where: {
										provider_providerAccountId: {
											provider: account.provider,
											providerAccountId: account.providerAccountId
										}
									},
									data: {
										access_token: account.access_token
									}
								}
							}
						}
					})
					.catch(() => null);
			}
		},
		pages: {
			signIn: "/login",
			signOut: "/signup",
			newUser: "/new-user"
		},
		providers: [
			GitHubProvider({
				clientId: process.env.GITHUB_CLIENT_ID,
				clientSecret: process.env.GITHUB_CLIENT_SECRET,
				profile: (profile) => {
					return {
						id: profile.id,
						name: profile.login as string,
						description: profile.bio,
						email: profile.email as string,
						image: profile.avatar_url as string
					};
				},
				authorization: {
					params: {
						scope: "public_repo read:org read:user user:email user:follow"
					}
				}
			})
		],
		session: {
			strategy: "jwt"
		},
		...(process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
			? {
					cookies: {
						sessionToken: {
							name: "__Secure-next-auth.session-token",
							options: {
								// The default would be the exact domain. We also want to allow passing
								// credentials with requests to the `graphcdn` subdomain, so we make
								// this cookie readable for all subdomains.
								// Note that this is only relevant for the production deployment. When
								// developing on localhost, no domain needs to be set.
								// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
								domain: `${process.env.NEXTAUTH_URL!.replace(
									/^https?:\/\/(www\.)?/,
									"."
								)}`,
								httpOnly: true,
								path: "/",
								sameSite: "lax",
								secure: true
							}
						}
					}
			  }
			: {})
	});

export default authHandler;
