import type { Exchange } from "urql";

export const noopExchange =
	(): Exchange =>
	({ forward }) =>
	(operations$) => {
		const operationResult$ = forward(operations$);

		return operationResult$;
	};
