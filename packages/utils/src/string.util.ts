export interface StringPartition {
	value: string;
	match: boolean;
}

export class StringUtils {
	public static partition(
		str: string,
		ranges: readonly [start: number, end: number][]
	): readonly StringPartition[] {
		const result: StringPartition[] = [];

		let currentStart = 0;

		ranges.forEach(([start, end]) => {
			const nonMatch = str.substring(currentStart, start);
			const match = str.substring(start, end + 1);

			if (nonMatch.length > 0) result.push({ value: nonMatch, match: false });
			if (match.length > 0) result.push({ value: match, match: true });
			currentStart = end + 1;
		});

		const finalMatch = str.substring(currentStart);

		if (finalMatch.length > 0) result.push({ value: finalMatch, match: false });

		return result;
	}

	public static rename<T>(
		templateLiteral: (strings: TemplateStringsArray, ...exprs: any[]) => T
	): (strings: TemplateStringsArray, ...exprs: any[]) => T {
		return (strings: TemplateStringsArray, ...exprs: any[]) => {
			return templateLiteral(strings, ...exprs);
		};
	}

	public static toUrlSlug(name: string): string {
		const urlSlug: string = name
			.split(/\s+/g)
			.map((word) => word.replace(/[^a-z0-9]/gim, ""))
			.map((word) => word.toLocaleLowerCase())
			.join("-")
			.replace(/(-)+/g, "-")
			.replace(/(^-)|(-$)/g, "")
			.trim();

		return urlSlug;
	}
}
