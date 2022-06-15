export class LangUtils {
	public static isNil<T extends unknown>(value: Maybe<T>): value is null | undefined {
		return typeof value === "undefined" || value === null;
	}
}
