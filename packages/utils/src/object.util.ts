import type { FieldPath, FieldPathValue, FieldValues, UnpackNestedValue } from "react-hook-form";
import { LangUtils } from "./lang.util";

const compact = <TValue>(value: TValue[]) => (Array.isArray(value) ? value.filter(Boolean) : []);
const isDateObject = (value: unknown): value is Date => value instanceof Date;
const isKey = (value: string) => /^\w*$/.test(value);
const isObjectType = (value: unknown) => typeof value === "object";
const isObject = <T extends object>(value: unknown): value is T =>
	!LangUtils.isNil(value) && !Array.isArray(value) && isObjectType(value) && !isDateObject(value);
const stringToPath = (input: string): string[] =>
	compact(input.replace(/["|']|\]/g, "").split(/\.|\[/));

export class ObjectUtils {
	public static get<
		TFieldValues extends FieldValues = FieldValues,
		TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
	>(
		obj: Maybe<TFieldValues>,
		path: TName,
		defaultValue?: unknown
	): UnpackNestedValue<FieldPathValue<TFieldValues, TName>> | undefined {
		if (!path || !isObject(obj)) {
			return defaultValue as any;
		}

		const result = compact(path.split(/[,[\].]+?/)).reduce(
			(state, key) => (LangUtils.isNil(state) ? state : state[key]),
			obj
		);

		return result === "undefined" || result === obj
			? obj[path] === "undefined"
				? defaultValue
				: obj[path]
			: result;
	}

	/**
	 * @description Get the total count of words in all strings in a Json type (deeply nested).
	 * @author David Lee
	 * @date March 12, 2022
	 */
	public static getWordCount<T extends Json>(obj: T): number {
		if (!obj) return 0;

		if (typeof obj === "number") return 0;
		if (typeof obj === "boolean") return 0;
		if (typeof obj === "string") return obj.trim().match(/\w+/g)?.length ?? 0;

		if (Array.isArray(obj)) {
			return obj.reduce<number>((sum, item) => sum + ObjectUtils.getWordCount(item), 0);
		}

		if (typeof obj === "object") {
			return Object.values(obj).reduce<number>(
				(sum, value) => sum + ObjectUtils.getWordCount(value),
				0
			);
		}

		return 0;
	}

	public static set<TFieldValues extends FieldValues = FieldValues>(
		obj: TFieldValues,
		path: string,
		value: any
	) {
		let index = -1;
		const tempPath = isKey(path) ? [path] : stringToPath(path);
		const length = tempPath.length;
		const lastIndex = length - 1;

		while (++index < length) {
			const key = tempPath[index] as any;
			let newValue = value;

			if (index !== lastIndex) {
				const objValue = obj[key];
				newValue =
					isObject(objValue) || Array.isArray(objValue)
						? objValue
						: !isNaN(+tempPath[index + 1])
						? []
						: {};
			}

			if (!obj) return null;

			obj[key as keyof TFieldValues] = newValue;
			obj = obj[key];
		}
		return obj;
	}

	public static setStatic<T, S extends Record<string, unknown>>(base: T, staticProps: S): T & S {
		const _base: T = base;

		Object.entries(staticProps).forEach(([key, val]) => {
			_base[key as keyof T] = val as any;
		});

		return _base as T & S;
	}
}
