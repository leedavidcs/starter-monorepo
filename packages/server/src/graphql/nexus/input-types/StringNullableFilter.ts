import { inputObjectType } from "nexus";

export const StringNullableFilter = inputObjectType({
	name: "StringNullableFilter",
	definition: (t) => {
		t.string("contains");
		t.string("endsWith");
		t.string("equals");
		t.list.nonNull.string("in");
		t.field("not", { type: "StringNullableFilter" });
		t.list.nonNull.string("notIn");
		t.string("startsWith");
	}
});
