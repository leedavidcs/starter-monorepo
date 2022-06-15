export class MathUtils {
	public static clamp(
		num: number,
		options?: { min?: number; max?: number } | [min: number, max: number]
	): number {
		const { min = -Infinity, max = Infinity } = Array.isArray(options)
			? { min: options[0], max: options[1] }
			: options ?? {};

		return Math.max(Math.min(num, max), min);
	}
}
