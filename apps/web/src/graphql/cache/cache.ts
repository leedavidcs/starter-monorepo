import { cacheExchange } from "@urql/exchange-graphcache";
import type { IntrospectionData } from "@urql/exchange-graphcache/dist/types/ast";
import { relayPagination } from "@urql/exchange-graphcache/extras";
import type { Exchange } from "urql";
import type { Mutation } from "../generated";
import schema from "../generated/schema.gen.json";

export const createCache = (): Exchange => {
	return cacheExchange({
		keys: {
			GitHub: () => null,
			GitHubUserContributionCalendar: () => null,
			GitHubUserContributionCalendarDay: () => null,
			GitHubUserContributionCalendarWeek: () => null,
			SuggestOrganizations: () => null,
			SuggestRepositories: () => null,
			SuggestSkillOwners: () => null,
			SuggestSkills: () => null,
			TopLanguages: () => null,
			TopLanguage: () => null
		},
		resolvers: {
			Comment: {
				replies: relayPagination()
			},
			Post: {
				comments: relayPagination()
			},
			Query: {
				activityFeed: relayPagination(),
				comments: relayPagination(),
				experiences: relayPagination(),
				followableSkills: relayPagination(),
				repositories: relayPagination(),
				posts: relayPagination(),
				skills: relayPagination(),
				suggestFriends: relayPagination()
			},
			Skill: {
				posts: relayPagination(),
				users: relayPagination()
			},
			User: {
				activities: relayPagination(),
				chats: relayPagination(),
				codeExamples: relayPagination(),
				desiredSkills: relayPagination(),
				followers: relayPagination(),
				following: relayPagination(),
				friends: relayPagination(),
				friendRequestsReceived: relayPagination(),
				notifications: relayPagination(),
				repositories: relayPagination(),
				skills: relayPagination()
			}
		},
		schema: schema as IntrospectionData,
		updates: {
			Mutation: {
				acceptFriendship: ({ acceptFriendship: result }: Mutation, _, cache) => {
					if (!result.record) return;

					const viewerId = result.viewer?.id;

					if (!viewerId) return;

					cache
						.inspectFields({ __typename: "User", id: viewerId })
						.filter((field) =>
							["activities", "friendRequestsReceived"].includes(field.fieldName)
						)
						.forEach((field) => {
							cache.invalidate(
								{ __typename: "User", id: viewerId },
								field.fieldName,
								field.arguments
							);
						});
				},
				addDesiredSkill: ({ addDesiredSkill: result }: Mutation, _, cache) => {
					if (!result.record) return;

					const viewerId = result.viewer?.id;

					if (!viewerId) return;

					cache
						.inspectFields({ __typename: "User", id: viewerId })
						.filter((field) => field.fieldName === "desiredSkills")
						.forEach((field) => {
							cache.invalidate(
								{ __typename: "User", id: viewerId },
								field.fieldName,
								field.arguments
							);
						});
				},
				addSkill: ({ addSkill: result }: Mutation, _, cache) => {
					if (!result.record) return;

					const viewerId = result.viewer?.id;

					if (!viewerId) return;

					cache
						.inspectFields({ __typename: "User", id: viewerId })
						.filter((field) => field.fieldName === "skills")
						.forEach((field) => {
							cache.invalidate(
								{ __typename: "User", id: viewerId },
								field.fieldName,
								field.arguments
							);
						});
				},
				commentCodeExample: ({ commentCodeExample: result }: Mutation, _, cache) => {
					if (!result.record) return;

					const viewerId = result.viewer?.id;

					if (!viewerId) return;

					const parentId = result.record.parentId;
					const codeExampleId = result.record.codeExampleId;

					cache
						.inspectFields({ __typename: "User", id: viewerId })
						.filter((field) => field.fieldName === "activities")
						.forEach((field) => {
							cache.invalidate(
								{ __typename: "User", id: viewerId },
								field.fieldName,
								field.arguments
							);
						});

					if (parentId) {
						cache
							.inspectFields({ __typename: "Comment", id: parentId })
							.filter((field) => field.fieldName === "replies")
							.forEach((field) => {
								cache.invalidate(
									{ __typename: "Comment", id: parentId },
									field.fieldName,
									field.arguments
								);
							});

						return;
					}

					if (codeExampleId) {
						cache
							.inspectFields({ __typename: "CodeExample", id: codeExampleId })
							.filter((field) => field.fieldName === "comments")
							.forEach((field) => {
								cache.invalidate(
									{ __typename: "CodeExample", id: codeExampleId },
									field.fieldName,
									field.arguments
								);
							});
					}
				},
				commentPost: ({ commentPost: result }: Mutation, _, cache) => {
					if (!result.record) return;

					const viewerId = result.viewer?.id;

					if (!viewerId) return;

					const parentId = result.record.parentId;
					const postId = result.record.postId;

					cache
						.inspectFields({ __typename: "User", id: viewerId })
						.filter((field) => field.fieldName === "activities")
						.forEach((field) => {
							cache.invalidate(
								{ __typename: "User", id: viewerId },
								field.fieldName,
								field.arguments
							);
						});

					if (parentId) {
						cache
							.inspectFields({ __typename: "Comment", id: parentId })
							.filter((field) => field.fieldName === "replies")
							.forEach((field) => {
								cache.invalidate(
									{ __typename: "Comment", id: parentId },
									field.fieldName,
									field.arguments
								);
							});

						return;
					}

					if (postId) {
						cache
							.inspectFields({ __typename: "Post", id: postId })
							.filter((field) => field.fieldName === "comments")
							.forEach((field) => {
								cache.invalidate(
									{ __typename: "Post", id: postId },
									field.fieldName,
									field.arguments
								);
							});
					}
				},
				createChat: ({ createChat: result }: Mutation, _, cache) => {
					if (!result.record) return;

					const viewerId = result.viewer?.id;

					if (!viewerId) return;

					cache
						.inspectFields({ __typename: "User", id: viewerId })
						.filter((field) => field.fieldName === "chats")
						.forEach((field) => {
							cache.invalidate(
								{ __typename: "User", id: viewerId },
								field.fieldName,
								field.arguments
							);
						});
				},
				createCodeExample: ({ createCodeExample: result }: Mutation, _, cache) => {
					if (!result.record) return;

					const viewerId = result.viewer?.id;

					if (!viewerId) return;

					cache
						.inspectFields({ __typename: "User", id: viewerId })
						.filter((field) => ["activities", "codeExamples"].includes(field.fieldName))
						.forEach((field) => {
							cache.invalidate(
								{ __typename: "User", id: viewerId },
								field.fieldName,
								field.arguments
							);
						});
				},
				createExperience: ({ createExperience: result }: Mutation, _, cache) => {
					const viewerId = result.viewer?.id;

					if (!viewerId) return;

					cache
						.inspectFields({ __typename: "User", id: viewerId })
						.filter((field) => field.fieldName === "experiences")
						.forEach((field) => {
							cache.invalidate(
								{ __typename: "User", id: viewerId },
								field.fieldName,
								field.arguments
							);
						});
				},
				createPost: (_, __, cache) => {
					cache.invalidate("Query", "postDraft");
				},
				createRepository: ({ createRepository: result }: Mutation, _, cache) => {
					const viewerId = result.viewer?.id;

					if (!viewerId) return;

					cache
						.inspectFields({ __typename: "User", id: viewerId })
						.filter((field) => field.fieldName === "repositories")
						.forEach((field) => {
							cache.invalidate(
								{ __typename: "User", id: viewerId },
								field.fieldName,
								field.arguments
							);
						});
				},
				deleteCodeExample: ({ deleteCodeExample: result }: Mutation, _, cache) => {
					if (!result.record) return;

					cache.invalidate({ __typename: "CodeExample", id: result.record.id });

					const viewerId = result.viewer?.id;

					if (!viewerId) return;

					cache
						.inspectFields({ __typename: "User", id: viewerId })
						.filter((field) =>
							[
								"activities",
								"codeExamples",
								"commentUpvotes",
								"comments",
								"notifications",
								"trophies"
							].includes(field.fieldName)
						)
						.forEach((field) => {
							cache.invalidate(
								{ __typename: "User", id: viewerId },
								field.fieldName,
								field.arguments
							);
						});
				},
				deleteExperience: ({ deleteExperience: result }: Mutation, _, cache) => {
					if (!result.record) return;

					cache.invalidate({ __typename: "Experience", id: result.record.id });
				},
				deleteFriendship: ({ deleteFriendship: result }: Mutation, _, cache) => {
					if (!result.record) return;

					const viewerId = result.viewer?.id;

					if (!viewerId) return;

					cache
						.inspectFields({ __typename: "User", id: viewerId })
						.filter((field) => field.fieldName === "activities")
						.forEach((field) => {
							cache.invalidate(
								{ __typename: "User", id: viewerId },
								field.fieldName,
								field.arguments
							);
						});
				},
				deletePost: ({ deletePost: result }: Mutation, _, cache) => {
					if (!result.record) return;

					cache.invalidate({ __typename: "Post", id: result.record.id });

					const viewerId = result.viewer?.id;

					if (!viewerId) return;

					cache
						.inspectFields({ __typename: "User", id: viewerId })
						.filter((field) =>
							[
								"activities",
								"commentUpvotes",
								"comments",
								"notifications",
								"posts",
								"postUpvotes",
								"postViews",
								"trophies"
							].includes(field.fieldName)
						)
						.forEach((field) => {
							cache.invalidate(
								{ __typename: "User", id: viewerId },
								field.fieldName,
								field.arguments
							);
						});
				},
				deleteRepository: ({ deleteRepository: result }: Mutation, _, cache) => {
					if (!result.record) return;

					cache.invalidate({ __typename: "Repository", id: result.record.id });
				},
				followSkill: ({ followSkill: result }: Mutation, _, cache) => {
					if (!result.record) return;

					const viewerId = result.viewer?.id;

					if (!viewerId) return;

					cache
						.inspectFields({ __typename: "User", id: viewerId })
						.filter((field) => field.fieldName === "activities")
						.forEach((field) => {
							cache.invalidate(
								{ __typename: "User", id: viewerId },
								field.fieldName,
								field.arguments
							);
						});
				},
				followUser: ({ followUser: result }: Mutation, _, cache) => {
					const recordId = result.record?.id;
					const viewerId = result.viewer?.id;

					if (!recordId) return;
					if (!viewerId) return;

					cache
						.inspectFields({ __typename: "User", id: viewerId })
						.filter((field) => field.fieldName === "activities")
						.forEach((field) => {
							cache.invalidate(
								{ __typename: "User", id: viewerId },
								field.fieldName,
								field.arguments
							);
						});

					cache
						.inspectFields({ __typename: "User", id: recordId })
						.filter((field) => field.fieldName === "trophies")
						.forEach((field) => {
							cache.invalidate(
								{ __typename: "User", id: recordId },
								field.fieldName,
								field.arguments
							);
						});
				},
				leaveChat: ({ leaveChat: result }: Mutation, _, cache) => {
					if (!result.record) return;

					cache.invalidate({ __typename: "Chat", id: result.record.id });
				},
				openMessages: ({ openMessages: result }: Mutation, _, cache) => {
					if (!result.record) return;

					const viewerId = result.viewer?.id;

					if (!viewerId) return;

					cache
						.inspectFields({ __typename: "User", id: viewerId })
						.filter((field) => ["chats", "newMessagesCount"].includes(field.fieldName))
						.forEach((field) => {
							cache.invalidate(
								{ __typename: "User", id: viewerId },
								field.fieldName,
								field.arguments
							);
						});
				},
				openNotifications: ({ openNotifications: result }: Mutation, _, cache) => {
					if (!result.record) return;

					const viewerId = result.viewer?.id;

					if (!viewerId) return;

					cache
						.inspectFields({ __typename: "User", id: viewerId })
						.filter((field) =>
							["newNotificationsCount", "notifications"].includes(field.fieldName)
						)
						.forEach((field) => {
							cache.invalidate(
								{ __typename: "User", id: viewerId },
								field.fieldName,
								field.arguments
							);
						});
				},
				publishPost: ({ publishPost: result }: Mutation, _, cache) => {
					if (!result.record) return;

					const viewerId = result.viewer?.id;

					if (!viewerId) return;

					cache
						.inspectFields({ __typename: "User", id: viewerId })
						.filter((field) =>
							["activities", "posts", "trophies"].includes(field.fieldName)
						)
						.forEach((field) => {
							cache.invalidate(
								{ __typename: "User", id: viewerId },
								field.fieldName,
								field.arguments
							);
						});
				},
				rejectFriendship: ({ rejectFriendship: result }: Mutation, _, cache) => {
					if (!result.record) return;

					const viewerId = result.viewer?.id;

					if (!viewerId) return;

					cache
						.inspectFields({ __typename: "User", id: viewerId })
						.filter((field) => field.fieldName === "friendRequestsReceived")
						.forEach((field) => {
							cache.invalidate(
								{ __typename: "User", id: viewerId },
								field.fieldName,
								field.arguments
							);
						});
				},
				removeDesiredSkill: ({ removeDesiredSkill: result }: Mutation, _, cache) => {
					if (!result.record) return;

					const viewerId = result.viewer?.id;

					if (!viewerId) return;

					cache
						.inspectFields({ __typename: "User", id: viewerId })
						.filter((field) => field.fieldName === "skills")
						.forEach((field) => {
							cache.invalidate(
								{ __typename: "User", id: viewerId },
								field.fieldName,
								field.arguments
							);
						});
				},
				removeSkill: ({ removeSkill: result }: Mutation, _, cache) => {
					if (!result.record) return;

					const viewerId = result.viewer?.id;

					if (!viewerId) return;

					cache
						.inspectFields({ __typename: "User", id: viewerId })
						.filter((field) => field.fieldName === "skills")
						.forEach((field) => {
							cache.invalidate(
								{ __typename: "User", id: viewerId },
								field.fieldName,
								field.arguments
							);
						});
				},
				unfollowSkill: ({ unfollowSkill: result }: Mutation, _, cache) => {
					if (!result.record) return;

					const viewerId = result.viewer?.id;

					if (!viewerId) return;

					cache
						.inspectFields({ __typename: "User", id: viewerId })
						.filter((field) => field.fieldName === "activities")
						.forEach((field) => {
							cache.invalidate(
								{ __typename: "User", id: viewerId },
								field.fieldName,
								field.arguments
							);
						});
				},
				unfollowUser: ({ unfollowUser: result }: Mutation, _, cache) => {
					const recordId = result.record?.id;
					const viewerId = result.viewer?.id;

					if (!recordId) return;
					if (!viewerId) return;

					cache
						.inspectFields({ __typename: "User", id: viewerId })
						.filter((field) => field.fieldName === "activities")
						.forEach((field) => {
							cache.invalidate(
								{ __typename: "User", id: viewerId },
								field.fieldName,
								field.arguments
							);
						});

					cache
						.inspectFields({ __typename: "User", id: recordId })
						.filter((field) => field.fieldName === "trophies")
						.forEach((field) => {
							cache.invalidate(
								{ __typename: "User", id: recordId },
								field.fieldName,
								field.arguments
							);
						});
				},
				unvoteCodeExample: ({ unvoteCodeExample: result }: Mutation, _, cache) => {
					if (!result.record) return;

					const viewerId = result.viewer?.id;

					if (!viewerId) return;

					cache
						.inspectFields({ __typename: "User", id: viewerId })
						.filter((field) => field.fieldName === "activities")
						.forEach((field) => {
							cache.invalidate(
								{ __typename: "User", id: viewerId },
								field.fieldName,
								field.arguments
							);
						});
				},
				unvotePost: ({ unvotePost: result }: Mutation, _, cache) => {
					if (!result.record) return;

					const viewerId = result.viewer?.id;

					if (!viewerId) return;

					cache
						.inspectFields({ __typename: "User", id: viewerId })
						.filter((field) => field.fieldName === "activities")
						.forEach((field) => {
							cache.invalidate(
								{ __typename: "User", id: viewerId },
								field.fieldName,
								field.arguments
							);
						});
				},
				updateDesiredSkills: ({ updateDesiredSkills: result }: Mutation, _, cache) => {
					if (!result.record) return;

					const viewerId = result.viewer?.id;

					if (!viewerId) return;

					cache
						.inspectFields({ __typename: "User", id: viewerId })
						.filter((field) => field.fieldName === "desiredSkills")
						.forEach((field) => {
							cache.invalidate(
								{ __typename: "User", id: viewerId },
								field.fieldName,
								field.arguments
							);
						});
				},
				updateSkills: ({ updateSkills: result }: Mutation, _, cache) => {
					if (!result.record) return;

					const viewerId = result.viewer?.id;

					if (!viewerId) return;

					cache
						.inspectFields({ __typename: "User", id: viewerId })
						.filter((field) => field.fieldName === "skills")
						.forEach((field) => {
							cache.invalidate(
								{ __typename: "User", id: viewerId },
								field.fieldName,
								field.arguments
							);
						});
				},
				upvoteCodeExample: ({ upvoteCodeExample: result }: Mutation, _, cache) => {
					if (!result.record) return;

					const viewerId = result.viewer?.id;

					if (!viewerId) return;

					cache
						.inspectFields({ __typename: "User", id: viewerId })
						.filter((field) => field.fieldName === "activities")
						.forEach((field) => {
							cache.invalidate(
								{ __typename: "User", id: viewerId },
								field.fieldName,
								field.arguments
							);
						});
				},
				upvotePost: ({ upvotePost: result }: Mutation, _, cache) => {
					if (!result.record) return;

					const viewerId = result.viewer?.id;

					if (!viewerId) return;

					cache
						.inspectFields({ __typename: "User", id: viewerId })
						.filter((field) => field.fieldName === "activities")
						.forEach((field) => {
							cache.invalidate(
								{ __typename: "User", id: viewerId },
								field.fieldName,
								field.arguments
							);
						});
				}
			}
		}
	});
};
