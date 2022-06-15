import { refocusExchange as urqlRefocusExchange } from "@urql/exchange-refocus";
import type { Exchange } from "urql";

export const refocusExchange = (): Exchange => {
	return urqlRefocusExchange();
};
