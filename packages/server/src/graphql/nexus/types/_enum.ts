import { enumType } from "nexus";

export const enumTypes = [
	enumType({
		name: "SortOrder",
		members: {
			Asc: "asc",
			Desc: "desc"
		}
	})
];
