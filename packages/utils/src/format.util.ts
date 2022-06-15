export class FormatUtils {
	public static toGitHubFixed(num: number): string {
		return this.toFixed(num, {
			fractionDigits: 1,
			map: (value: number) => {
				return value >= 100 ? Math.round(value) : value;
			},
			trailingZeros: false
		});
	}

	public static toFixed(
		num: number,
		options: {
			fractionDigits?: number;
			map?: (num: number) => number;
			trailingZeros?: boolean;
		} = {}
	): string {
		const { fractionDigits = 0, map = (val) => val, trailingZeros = true } = options;

		const groups: readonly [exp: number, suffix: string][] = [
			[3, "K"],
			[6, "M"],
			[9, "B"]
		];

		const result = groups
			.slice()
			.reverse()
			.map(([exp, suffix]) => {
				if (num < 10 ** exp) return null;

				const divisor = 10 ** (exp - fractionDigits);
				const rounded = Math.round(num / divisor) / 10 ** fractionDigits;
				const fixed = map(rounded).toFixed(fractionDigits);
				const pre = trailingZeros ? fixed : fixed.replace(/\.?0+$/, "");

				return `${pre}${suffix}`;
			})
			.find((val) => !!val);

		return result ?? num.toString();
	}
}
