import { multipartFetchExchange as urqlMultipartFetchExchange } from "@urql/exchange-multipart-fetch";
import type { Exchange } from "urql";

export const multipartFetchExchange = (): Exchange => {
	return urqlMultipartFetchExchange;
};
