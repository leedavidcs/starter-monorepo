export interface GetApiUrlOptions {
	bypassCdn?: boolean;
	isStatic?: boolean;
}

const formatApiUrl = (url: Maybe<string>): string => {
	if (!url) throw new Error("Invalid API_URL");

	/**
	 * !HACK
	 * @description
	 * We replace https:// from the URL if it exists and add it ourselves
	 * always at the beginning as the above environment variables are not
	 * guaranteed to include it
	 */
	return `https://${url.replace(/^https?:\/\//, "")}/api/graphql`;
};

/**
 * Consistently determine the API URL for the current client even when in a
 * deploy preview or similar
 */
export const getApiUrl = (options?: GetApiUrlOptions): string => {
	const { bypassCdn = false, isStatic = false } = options ?? {};

	/**
	 * !HACK
	 * @description If we want to bypass GraphCDN, we need to hit the same-domain api directly
	 * @author David Lee
	 * @date June 13, 2022
	 */
	if (bypassCdn) {
		const bypassUrl =
			process.env.API_URL_BYPASS_CDN || process.env.VERCEL_URL || process.env.DEPLOY_URL;

		return bypassUrl ? formatApiUrl(bypassUrl) : "http://localhost:3001/api/graphql";
	}

	/**
	 * !HACK
	 * @description Normally, in the browser, a relative URL would work perfectly; however, with
	 * next-auth in production, and hitting GraphCDN via a subdomain, we need to use the same
	 * API_URL if available.
	 * @author David Lee
	 * @date May 9, 2022
	 */
	if (process.browser) {
		return process.env.API_URL ? formatApiUrl(process.env.API_URL) : "/api/graphql";
	}

	/**
	 * !HACK
	 * @description Normally, using the same api url for static pages will error; however, in
	 * development mode, static pages will behave like SSR'ed pages, which allows us to directly
	 * use the development api for these static pages
	 * @author David Lee
	 * @date May 23, 2022
	 */
	if (isStatic && process.env.NODE_ENV === "development") {
		return "http://localhost:3001/api/graphql";
	}

	/**
	 * @description
	 * Infer the deploy URL if we're in production
	 * API_URL is for hitting GraphCDN if provided
	 * VERCEL_URL = Vercel, DEPLOY_URL = Netlify
	 *
	 * If this is run for a static page (isStatic = true), use the hosted api, because the local
	 * api won't be available during build-time
	 * @author David Lee
	 * @date April 17, 2022
	 */
	const providerUrl = isStatic
		? process.env.API_URL_STATIC_BUILD
		: process.env.API_URL || process.env.VERCEL_URL || process.env.DEPLOY_URL;

	return providerUrl ? formatApiUrl(providerUrl) : "http://localhost:3001/api/graphql";
};
