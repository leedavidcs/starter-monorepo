export class ArrayUtils {
	public static distinct<T>(array: readonly T[]): readonly T[] {
		return Array.from(array.reduce((set, item) => set.add(item), new Set<T>()));
	}

	public static dropFalsey<T>(array: readonly Maybe<T>[]): readonly T[] {
		return array.filter((item) => !!item) as readonly T[];
	}

	public static dropRightWhile<T>(
		array: readonly T[],
		predicate: (value: T, index: number) => boolean
	): readonly T[] {
		const end = array
			.slice()
			.reverse()
			.findIndex((value, i) => !predicate(value, i));

		if (end === -1) return [];
		if (end === 0) return array;

		return array.slice(0, -end);
	}

	public static dropWhile<T>(
		array: readonly T[],
		predicate: (value: T, index: number) => boolean
	): readonly T[] {
		const start = array.findIndex((value, i) => !predicate(value, i));

		return start === -1 ? [] : array.slice(start);
	}

	public static move<T>(array: readonly T[], from: number, to: number): readonly T[] {
		const newArray: T[] = [...array];

		const startIndex = to < 0 ? newArray.length + to : to;

		if (startIndex >= 0 && startIndex < newArray.length) {
			const item: T = newArray.splice(from, 1)[0];

			newArray.splice(startIndex, 0, item);
		}

		return newArray;
	}

	public static shuffle<T>(array: readonly T[]): readonly T[] {
		return array.slice().sort(() => Math.random() - 0.5);
	}

	public static swap<T>(array: readonly T[], from: number, to: number): readonly T[] {
		const outOfBounds = from >= array.length || to >= array.length;

		if (outOfBounds) throw new Error("Array index out of bounds");

		const newArray: T[] = [...array];

		newArray[to] = array[from];
		newArray[from] = array[to];

		return newArray;
	}
}
