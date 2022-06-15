import {
	BigIntResolver,
	ByteResolver,
	DateTimeResolver,
	JSONObjectResolver,
	URLResolver
} from "graphql-scalars";
import { GraphQLUpload } from "graphql-upload";
import { scalarType } from "nexus";

export const scalarTypes = [
	scalarType({
		name: BigIntResolver.name,
		asNexusMethod: "bigInt",
		description: BigIntResolver.description,
		serialize: BigIntResolver.serialize,
		parseValue: BigIntResolver.parseValue,
		parseLiteral: BigIntResolver.parseLiteral
	}),
	scalarType({
		name: "Bytes",
		asNexusMethod: "bytes",
		description: ByteResolver.description,
		serialize: ByteResolver.serialize,
		parseValue: ByteResolver.parseValue,
		parseLiteral: ByteResolver.parseLiteral
	}),
	scalarType({
		name: DateTimeResolver.name,
		asNexusMethod: "dateTime",
		description: DateTimeResolver.description,
		serialize: DateTimeResolver.serialize,
		parseValue: DateTimeResolver.parseValue,
		parseLiteral: DateTimeResolver.parseLiteral
	}),
	scalarType({
		name: "Json",
		asNexusMethod: "json",
		description: JSONObjectResolver.description,
		serialize: JSONObjectResolver.serialize,
		parseValue: JSONObjectResolver.parseValue,
		parseLiteral: JSONObjectResolver.parseLiteral
	}),
	scalarType({
		sourceType: "Promise<FileUpload>",
		name: "Upload",
		asNexusMethod: "upload",
		description: GraphQLUpload?.description,
		serialize: GraphQLUpload?.serialize,
		parseValue: GraphQLUpload?.parseValue,
		parseLiteral: GraphQLUpload?.parseLiteral as any
	}),
	scalarType({
		name: URLResolver.name,
		asNexusMethod: "url",
		description: URLResolver.description,
		serialize: URLResolver.serialize,
		parseValue: URLResolver.parseValue,
		parseLiteral: URLResolver.parseLiteral
	})
];
