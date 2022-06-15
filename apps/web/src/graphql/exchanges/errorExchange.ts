import { toast } from "@app/components";
import type { Exchange } from "urql";
import { errorExchange as urqlErrorExchange } from "urql";
import { noopExchange } from "./noopExchange";

export const errorExchange = (): Exchange => {
	if (process.env.NODE_ENV === "development") {
		return urqlErrorExchange({
			onError: (error) => {
				// eslint-disable-next-line no-console
				console.error(error);

				toast.error(error.message.replace("[GraphQL]", "Server error:"));
			}
		});
	}

	return noopExchange();
};
