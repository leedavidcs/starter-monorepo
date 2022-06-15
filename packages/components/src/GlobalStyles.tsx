import React from "react";
import { createGlobalStyle } from "styled-components";
import tw, { GlobalStyles as BaseStyles } from "twin.macro";

const CustomStyles = createGlobalStyle`
body {
	${tw`
		antialiased
		bg-blueGray-50
	`}
}
`;

export const GlobalStyles = () => (
	<>
		<BaseStyles />
		<CustomStyles />
	</>
);
