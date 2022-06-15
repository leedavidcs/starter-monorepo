import { WindowUtils } from "@app/utils";
import type { SSRData, SSRExchange } from "@urql/core/dist/types/exchanges/ssr";
import deepMerge from "deepmerge";
import deepEqual from "fast-deep-equal";
import type { GetServerSidePropsContext } from "next";
import type { Client } from "urql";
import { createClient, dedupExchange, ssrExchange } from "urql";
import { createCache } from "./cache";
import {
	devtoolsExchange,
	errorExchange,
	multipartFetchExchange,
	persistedFetchExchange,
	refocusExchange,
	requestPolicyExchange
} from "./exchanges";
import { getApiUrl } from "./getApiUrl";

export const URQL_STATE_PROP_NAME = "__URQL_STATE__";

let ssr: SSRExchange;
let urqlClient: Client | null = null;

export interface CreateUrqlClientParams {
	isStatic?: boolean;
	req?: GetServerSidePropsContext["req"];
	ssr?: SSRExchange;
}

export const createUrqlClient = (params: CreateUrqlClientParams = {}): Client => {
	const { isStatic, ssr: _ssr = ssrExchange({ isClient: !params.req }), req } = params;

	if (WindowUtils.isSsr() || !urqlClient) {
		urqlClient = createClient({
			exchanges: [
				devtoolsExchange(),
				dedupExchange,
				requestPolicyExchange(),
				refocusExchange(),
				createCache(),
				errorExchange(),
				_ssr,
				persistedFetchExchange(),
				multipartFetchExchange()
			],
			fetchOptions: {
				credentials: "include",
				headers: {
					cookie: req?.headers.cookie ?? (WindowUtils.isBrowser() ? document.cookie : "")
				}
			},
			maskTypename: false,
			requestPolicy: "cache-first",
			url: getApiUrl({ isStatic })
		});

		// Serialize the urqlClient to null on the client-side.
		// This ensures we don't share client and server instances of the urqlClient.
		(urqlClient as any).toJSON = () => null;
	}

	return urqlClient;
};

export interface InitializeUrqlOptions {
	initialState?: SSRData;
}

export const initializeUrql = (options: InitializeUrqlOptions = {}): Client => {
	const { initialState = {} } = options;

	if (!ssr || WindowUtils.isSsr()) {
		ssr = ssrExchange({ initialState, isClient: true });
	} else if (ssr && WindowUtils.isBrowser()) {
		const existingCache = ssr.extractData();

		// Merge the existing cache into the data passed from getStaticProps/getServerSideProps
		const data = deepMerge(initialState, existingCache, {
			// combine arrays using deep object equality (like in sets)
			/* eslint-disable */
			arrayMerge: (destinationArray, sourceArray) => [
				...sourceArray,
				...destinationArray.filter((d) => sourceArray.every((s) => !deepEqual(d, s)))
			]
			/* eslint-enable */
		});

		ssr.restoreData(data);
	}

	return createUrqlClient({ ssr });
};

export const addUrqlState = <T extends { props: Record<string, any> }>(
	ssrCache: SSRExchange,
	pageProps: T
) => {
	return {
		props: {
			...pageProps.props,
			[URQL_STATE_PROP_NAME]: ssrCache.extractData()
		}
	} as T & { props: T["props"] & { [URQL_STATE_PROP_NAME]: SSRData } };
};
