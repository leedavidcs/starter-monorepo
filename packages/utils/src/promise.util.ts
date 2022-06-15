export interface PromiseUtilsMapOptions {
	concurrency: number;
}

export class PromiseUtils {
	public static every = async <I>(
		items: I[],
		options: Maybe<Partial<PromiseUtilsMapOptions>>,
		predicate: (item: I, index: number) => Promise<boolean>
	): Promise<boolean> => {
		return !(await this.some(
			items,
			options,
			async (item, index) => !(await predicate(item, index))
		));
	};

	public static map = async <I, R>(
		items: I[],
		options: Maybe<Partial<PromiseUtilsMapOptions>>,
		mapFn: (item: I, index: number) => Promise<R>
	): Promise<R[]> => {
		const { concurrency }: PromiseUtilsMapOptions = { concurrency: 1, ...(options ?? {}) };

		if (items.length === 0) return [];

		const results: R[] = Array(items.length).fill(null);
		const trueConcurrencyLimit: number = Math.min(items.length, concurrency);

		let index: number;

		const iterablePromiseFn = async (item: I, i: number): Promise<I | undefined> => {
			const result = await mapFn(item, i);

			results[i] = result;

			const isOutOfItems: boolean = index++ >= items.length - 1;

			return isOutOfItems ? undefined : iterablePromiseFn(items[index], index);
		};

		const rateLimitedProcessor = Array(trueConcurrencyLimit)
			.fill(null)
			.map((__, i) => {
				index = i;

				return iterablePromiseFn(items[i], i);
			});

		return Promise.all(rateLimitedProcessor).then(() => results);
	};

	public static some = async <I>(
		items: I[],
		options: Maybe<Partial<PromiseUtilsMapOptions>>,
		predicate: (item: I, index: number) => Promise<boolean>
	): Promise<boolean> => {
		const { concurrency }: PromiseUtilsMapOptions = { concurrency: 1, ...(options ?? {}) };

		if (items.length === 0) return false;

		const trueConcurrencyLimit: number = Math.min(items.length, concurrency);

		let index: number;
		let didFind: boolean = false;

		const iterablePromiseFn = async (item: I, i: number): Promise<boolean> => {
			const result = await predicate(item, i);

			if (didFind || result) {
				didFind = true;

				return true;
			}

			const isOutOfItems: boolean = index++ >= items.length - 1;

			return isOutOfItems ? false : iterablePromiseFn(items[index], index);
		};

		const rateLimitedProcessor = Array.from({ length: trueConcurrencyLimit }, (_, i) => {
			index = i;

			return iterablePromiseFn(items[i], i);
		});

		await Promise.all(rateLimitedProcessor);

		return didFind;
	};

	public static wait(msTime: number): Promise<void> {
		return new Promise<void>((resolve) => {
			setTimeout(() => resolve(), msTime);
		});
	}
}
