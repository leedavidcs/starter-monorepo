const colors = require("tailwindcss/colors");

module.exports = {
	theme: {
		extend: {
			colors: {
				...colors,
				current: "currentColor"
			}
		},
	},
	plugins: [
		require("@tailwindcss/aspect-ratio"),
		require("@tailwindcss/forms")({
			strategy: "class"
		}),
		require("@tailwindcss/line-clamp")
	],
};
