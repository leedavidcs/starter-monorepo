import { GlobalStyles, Toaster } from "@app/components";
import { action } from "@storybook/addon-actions";
import { addons } from "@storybook/addons";
import { themes } from "@storybook/theming";
import { urqlDecorator } from "@urql/storybook-addon";
import { domMax, LazyMotion } from "framer-motion";
import "tippy.js/dist/tippy.css";
import "twin.macro";
import { RouterContext as ComponentsRouterContext } from "../../../packages/components/node_modules/next/dist/shared/lib/router-context";
import { RouterContext as WwwRouterContext } from "../../web/node_modules/next/dist/shared/lib/router-context";

/**
 * !HACK
 * @description next/image doesn't work within Storybook, so we're overwriting it here
 * @author David Lee
 * @date June 11, 2021
 */
import * as WwwNextImage from "../../web/node_modules/next/image";
import * as ComponentsNextImage from "../../../packages/components/node_modules/next/image";

const overwriteNextImage = (nextImage: any) => {
	const OriginalNextImage = nextImage.default;

	Object.defineProperty(nextImage, "default", {
		configurable: true,
		value: (props) => (
			<OriginalNextImage
				{...props}
				unoptimized
				blurDataURL="data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAADAAQDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAbEAADAAMBAQAAAAAAAAAAAAABAgMABAURUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAFxEAAwEAAAAAAAAAAAAAAAAAAAECEf/aAAwDAQACEQMRAD8Anz9voy1dCI2mectSE5ioFCqia+KCwJ8HzGMZPqJb1oPEf//Z"
				loader={({ src }) => src}
			/>
		)
	});
};

overwriteNextImage(WwwNextImage);
overwriteNextImage(ComponentsNextImage);

const alphabeticSort = (a, b) => {
	const isSameKind: boolean = a[1].kind === b[1].kind;

	if (isSameKind) return false;

	const compared: boolean = a[1].id.localeCompare(b[1].id, undefined, { numeric: true });

	return compared;
};

addons.setConfig({
	showRoots: true,
	theme: themes.dark
});

const DEFAULT_VIEWPORT_HEIGHT = "1200px";

export const parameters = {
	actions: { argTypesRegex: "^on[A-Z].*" },
	controls: {
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/,
		},
	},
	nextRouter: {
		Provider: ({ children, value }) => (
			<ComponentsRouterContext.Provider value={value}>
				<WwwRouterContext.Provider value={value}>
					{children}
				</WwwRouterContext.Provider>
			</ComponentsRouterContext.Provider>
		),
		push(...args) {
			action("nextRouter.push")(...args);
		}
	},
	options: {
		storySort: alphabeticSort
	},
	viewport: {
		viewports: {
			"2xs": {
				name: "2xs",
				styles: {
					width: "360px",
					height: "640px"
				}
			},
			xs: {
				name: "xs",
				styles: {
					width: "475px",
					height: "800px"
				}
			},
			sm: {
				name: "sm",
				styles: {
					width: "640px",
					height: "960px"
				}
			},
			md: {
				name: "md",
				styles: {
					width: "768px",
					height: "1024px"
				}
			},
			lg: {
				name: "lg",
				styles: {
					width: "1024px",
					height: DEFAULT_VIEWPORT_HEIGHT
				}
			},
			xl: {
				name: "xl",
				styles: {
					width: "1280px",
					height: DEFAULT_VIEWPORT_HEIGHT
				}
			},
			"2xl": {
				name: "2xl",
				styles: {
					width: "1536px",
					height: DEFAULT_VIEWPORT_HEIGHT
				}
			}
		}
	}
};

export const decorators = [
	urqlDecorator,
	(Story) => (
		<>
			<GlobalStyles />
			<LazyMotion features={domMax} strict>
				<Story />
			</LazyMotion>
			<Toaster position="top-center" />
		</>
	)
];