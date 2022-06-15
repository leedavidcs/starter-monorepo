import { arg, intArg, list, nonNull, objectType, stringArg } from "nexus";

export const User = objectType({
	name: "User",
	definition: (t) => {
		t.nonNull.string("email", {
			authorize: (parent, args, { user }) => {
				return user?.id === parent.id;
			}
		});
		t.string("image");
		t.nonNull.string("name");
		t.implements("Node");
	}
});
