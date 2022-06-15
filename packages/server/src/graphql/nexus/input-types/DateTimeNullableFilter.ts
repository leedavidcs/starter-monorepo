import { inputObjectType } from "nexus";

export const DateTimeNullableFilter = inputObjectType({
	name: "DateTimeNullableFilter",
	definition: (t) => {
		t.dateTime("gt");
		t.dateTime("gte");
		t.dateTime("lt");
		t.dateTime("lte");
	}
});
