module.exports = {
	"presets": [
		["next/babel", {
			"preset-react": {
				"runtime": "automatic"
			}
		}]
	],
	"plugins": [
		"twin",
		"macros",
		["styled-components", {
			"ssr": true
		}]
	],
	"env": {
		"test": {
			"plugins": ["babel-plugin-dynamic-import-node"]
		}
	}
}
