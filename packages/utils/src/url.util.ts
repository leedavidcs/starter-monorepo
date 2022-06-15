import { LangUtils } from "./lang.util";

export class UrlUtils {
	public static toQuery(
		params: Record<string, Maybe<number | string>>,
		delimiter: string = "&"
	): string {
		return Object.keys(params)
			.filter((key) => !LangUtils.isNil(params[key]))
			.map((key) => `${key}=${params[key]}`)
			.join(delimiter);
	}

	public static appendQuery(url: string, params: Record<string, Maybe<number | string>>): string {
		const query = UrlUtils.toQuery(params);

		if (!Object.keys(query).length) return url;

		return `${url}${url.indexOf("?") === -1 ? "?" : "&"}${UrlUtils.toQuery(params)}`;
	}

	public static isValid(url: string): boolean {
		try {
			const _url = new URL(url);

			return _url.protocol === "http:" || _url.protocol === "https:";
		} catch {
			return false;
		}
	}

	public static isRelative(url: string): boolean {
		/**
		 * !HACK
		 * @description We're using https://google.com arbitrarily to test if the relative path,
		 * when appended to an absolute url, is still valid
		 * @author David Lee
		 * @date December 13, 2021
		 */
		return /^(\.\.\/|\.\/|\/)/.test(url) && this.isValid(`https://google.com${url}`);
	}

	public static isImage(url: string): boolean {
		const isValid = this.isValid(url);
		const isRelative = this.isRelative(url);

		if (!isValid && !isRelative) return false;

		/**
		 * !HACK
		 * @description We're using https://google.com arbitrarily to test if the relative path,
		 * when appended to an absolute url, is still valid
		 * @author David Lee
		 * @date December 13, 2021
		 */
		const urlString = isValid ? url : `https://google.com${url}`;
		const pathname = new URL(urlString).pathname.toString();

		const extension = pathname.split(".").slice(-1)[0];

		if (!extension) return false;

		return ["gif", "jpeg", "jpg", "png", "webp"].includes(extension);
	}
}
