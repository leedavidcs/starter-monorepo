import isPropValid from "@emotion/is-prop-valid";

export const ZIndicies = [
	"default",
	/**
	 * !HACK
	 * @description z-index: 1 is occasionally used manually, which may place higher than the
	 * app-bar unintentionally. So placing "extra" here to bump everything by +1.
	 * @author David Lee
	 * @date December 28, 2021
	 */
	"extra",
	"backdrop",
	"page-drawer",
	"app-bar",
	"dialog-backdrop",
	"dialog",
	"menu",
	"cookie-consent-backdrop",
	"cookie-consent"
] as const;

export type ZIndexType = typeof ZIndicies[number];

export class StyleUtils {
	public static getZIndex(type: ZIndexType): number {
		return ZIndicies.indexOf(type);
	}

	public static filterHTMLProps<T extends Record<string, any>>(props: T) {
		return Object.keys(props).reduce(
			(acc, key) => ({
				...acc,
				[key]: isPropValid(key) ? props[key] : undefined
			}),
			{} as Record<string, any>
		);
	}
}
