export class ColorUtils {
	public static getRandomColorFromString(str: string): string {
		const stringUniqueHash = str
			.split("")
			.reduce((acc, char) => char.charCodeAt(0) + ((acc << 5) - acc), 0);

		return `hsl(${stringUniqueHash % 360}, 95%, 35%)`;
	}
}
