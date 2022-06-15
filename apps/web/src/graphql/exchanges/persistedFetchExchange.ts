import { persistedFetchExchange as urqlPersistedFetchExchange } from "@urql/exchange-persisted-fetch";
import type { Exchange } from "urql";
import { noopExchange } from "./noopExchange";

export const persistedFetchExchange = (): Exchange => {
	if (process.env.NODE_ENV === "production") {
		return urqlPersistedFetchExchange({
			preferGetForPersistedQueries: true
		});
	}

	return noopExchange();
};
