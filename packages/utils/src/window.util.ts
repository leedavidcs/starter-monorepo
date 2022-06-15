import { UrlUtils } from "./url.util";

export class WindowUtils {
	public static getElement<T extends HTMLElement>(getter: () => T | null): HTMLElement | null {
		return this.isBrowser() ? getter() : null;
	}

	public static isBrowser(): boolean {
		return typeof window !== "undefined";
	}

	public static isSsr(): boolean {
		return typeof window === "undefined";
	}

	public static openWindow(
		url: string,
		name: string,
		query: Record<string, string | number>
	): Window | null {
		const height = 600;
		const width = 400;
		const top = window.screenY + (window.innerHeight - height) / 2;
		const left = window.screenX + (window.innerWidth - width) / 2;

		return window.open(
			url,
			name,
			UrlUtils.toQuery({ height, width, top, left, ...query }, ",")
		);
	}
}
