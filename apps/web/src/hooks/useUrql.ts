import type { SSRData } from "@urql/core/dist/types/exchanges/ssr";
import type { GetServerSidePropsResult } from "next";
import { useMemo } from "react";
import { Client } from "urql";
import { initializeUrql, URQL_STATE_PROP_NAME } from "../graphql";

export const useUrql = <P extends unknown>(pageProps: GetServerSidePropsResult<P>): Client => {
	const initialState = pageProps[URQL_STATE_PROP_NAME] as SSRData;

	const store = useMemo(() => initializeUrql({ initialState }), [initialState]);

	return store;
};
