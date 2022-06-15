import type { PrismaClient,  } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import type { JWT } from "next-auth/jwt";

export interface ServerContextUser {
	id: string;
	email: string;
	name: string;
}

export interface ServerContext {
	ip: Maybe<string>;
	jwt: Maybe<JWT>;
	prisma: PrismaClient;
	req: NextApiRequest;
	res: NextApiResponse;
	user: Maybe<ServerContextUser>;
}
