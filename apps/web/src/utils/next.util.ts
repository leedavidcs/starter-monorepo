import type { SSRData } from "@urql/core/dist/types/exchanges/ssr";
import type { GetServerSideProps, GetStaticProps } from "next";
import type { NextURL } from "next/dist/server/web/next-url";
// eslint-disable-next-line @next/next/no-server-import-in-page
import type { NextRequest } from "next/server";

const URQL_STATE_PROP_NAME = "__URQL_STATE__";

export interface WithInitialUrqlState {
	[URQL_STATE_PROP_NAME]: SSRData;
}

export class NextUtils {
	public static castSSRProps<P>(
		fn: GetServerSideProps<WithInitialUrqlState & P>
	): GetServerSideProps<NonNullable<WithInitialUrqlState & P>> {
		return fn as GetServerSideProps<NonNullable<WithInitialUrqlState & P>>;
	}

	public static castStaticProps<P>(
		fn: GetStaticProps<WithInitialUrqlState & P>
	): GetStaticProps<NonNullable<WithInitialUrqlState & P>> {
		return fn as GetStaticProps<NonNullable<WithInitialUrqlState & P>>;
	}

	public static concurrent<T extends readonly unknown[] | []>(
		values: T
	): Promise<{ -readonly [P in keyof T]: Awaited<T[P]> } | undefined[]> {
		return Promise.all(values).catch((e) => {
			if (process.env.NODE_ENV === "development") throw e;

			return values.map(() => undefined);
		});
	}

	public static getUrl(req: NextRequest, pathName?: string): NextURL {
		const url = req.nextUrl.clone();

		if (pathName) {
			url.pathname = pathName;
		}

		return url;
	}
}
