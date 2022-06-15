import { devtoolsExchange as urqlDevtoolsExchange } from "@urql/devtools";
import type { Exchange } from "urql";
import { noopExchange } from "./noopExchange";

export const devtoolsExchange = (): Exchange => {
	if (process.env.NODE_ENV === "development" && !process.env.STORYBOOK) {
		return urqlDevtoolsExchange;
	}

	return noopExchange();
};
