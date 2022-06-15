import { oneLine } from "common-tags";
import ms from "ms";
import NextProgress from "nextjs-progressbar";
import React, { FC } from "react";
import { theme } from "twin.macro";

export type NextProgressBarProps = Record<string, never>;

export const NextProgressBar: FC<NextProgressBarProps> = () => {
	return (
		<NextProgress
			color={oneLine`
				linear-gradient(
					-80deg,
					${theme`colors.pink.600`},
					${theme`colors.violet.600`},
					${theme`colors.blue.500`})
			`}
			height={6}
			startPosition={0.3}
			stopDelayMs={ms("0.2s")}
			options={{ showSpinner: false }}
		/>
	);
};
