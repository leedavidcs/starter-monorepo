import { stripIndents } from "common-tags";
import { lexicographicSortSchema } from "graphql";
import { fieldAuthorizePlugin, makeSchema } from "nexus";
import path from "path";
import * as inputTypes from "./input-types";
// import * as mutations from "./mutations";
// import * as queries from "./queries";
import * as types from "./types";

const isGenerateScript: boolean = process.argv.includes("--nexus-exit");

const _schema = makeSchema({
	shouldGenerateArtifacts: isGenerateScript,
	shouldExitAfterGenerateArtifacts: isGenerateScript,
	types: {
		/**
		 * TODO
		 * @description Add these when available
		 * @author David Lee
		 * @date June 12, 2022
		 */
		...inputTypes,
		// ...mutations,
		// ...queries,
		...types
	},
	outputs: {
		schema: path.resolve(__dirname, "./generated/schema.gen.graphql"),
		typegen: path.resolve(__dirname, "./generated/typegen.gen.d.ts")
	},
	features: {
		abstractTypeStrategies: {
			resolveType: false,
			isTypeOf: false,
			__typename: true
		}
	},
	nonNullDefaults: {
		input: false,
		output: false
	},
	plugins: [fieldAuthorizePlugin()],
	sourceTypes: {
		headers: [
			stripIndents`
				import type { FileUpload } from "@apollographql/graphql-upload-8-fork";
			`
		],
		modules: [],
		mapping: {
			DateTime: "Date",
			URL: "string"
		}
	},
	contextType: {
		module: path.resolve(__dirname, "../context.ts"),
		export: "ServerContext",
		alias: "ctx"
	}
});

export const schema =
	process.env.NODE_ENV !== "production" ? lexicographicSortSchema(_schema) : _schema;
