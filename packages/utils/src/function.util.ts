import { LangUtils } from "./lang.util";

export class FunctionUtils {
	public static compose<TFunc extends (...args: any[]) => any>(...fns: readonly TFunc[]): TFunc {
		return ((...args) => {
			return fns.reduce((prev, fn) => [fn(...prev)], args)[0];
		}) as TFunc;
	}

	public static debounce = <TFunc extends (...args: any[]) => any>(
		fn: TFunc,
		options?: { wait: number; immediate?: boolean }
	) => {
		const { wait, immediate = false } = options ?? {};

		let prevResult: ReturnType<TFunc> | undefined;
		let timeout: any = null;

		/* eslint-disable func-names */
		return function (...args: Parameters<TFunc>): ReturnType<TFunc> | undefined {
			/* eslint-enable func-names */

			/* eslint-disable @typescript-eslint/no-this-alias */
			const context = this;
			/* eslint-enable @typescript-eslint/no-this-alias */

			if (!LangUtils.isNil(timeout)) {
				clearTimeout(timeout);
			}

			timeout = setTimeout(() => {
				timeout = null;

				if (!immediate) {
					prevResult = fn.apply(context, args);
				}
			}, wait);

			if (immediate && !timeout) {
				return fn.apply(context, args);
			}

			return prevResult;
		};
	};

	public static throttle = <TFunc extends (...args: any[]) => any>(
		fn: TFunc,
		timeFrame: number
	) => {
		const prevTimeRef: { current: number } = {
			current: new Date().getTime()
		};

		const throttled = (...args: Parameters<TFunc>): ReturnType<TFunc> | undefined => {
			const now: number = new Date().getTime();
			const diff: number = now - prevTimeRef.current;

			if (diff < timeFrame) {
				return;
			}

			prevTimeRef.current = now;

			return fn(...args);
		};

		return throttled;
	};
}
