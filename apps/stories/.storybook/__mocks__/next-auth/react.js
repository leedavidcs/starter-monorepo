const { createContext, useContext, createElement } = require("react");

const SessionContext = createContext({
	session: {
		accessToken: "",
		expires: "1",
		user: {
			id: "0",
			accessToken: "",
			email: "storybook@test-storybook.com",
			name: "leedavidcs",
			image: "https://avatars.githubusercontent.com/u/15151154"
		}	
	}
});

const SessionProvider = ({ children, session }) => {
	return createElement(SessionContext.Provider, { value: { session } }, children);
};

module.exports = {
	SessionProvider,
	signIn: () => undefined,
	signOut: () => undefined,
	useSession: () => {
		const { session } = useContext(SessionContext);

		const status = session ? "authenticated" : "unauthenticated";

		return {
			data: session,
			status
		};
	}
};
