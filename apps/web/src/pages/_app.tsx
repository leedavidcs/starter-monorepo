import {
	ErrorBoundary,
	GlobalStyles,
	LazyMotion,
	Toaster
} from "@app/components";
import type { NextProgressBarProps } from "@app/components";
import ms from "ms";
import type { NextComponentType } from "next";
import { SessionProvider } from "next-auth/react";
import type { AppContext, AppInitialProps, AppProps } from "next/app";
import dynamic from "next/dynamic";
import NextHead from "next/head";
import React from "react";
import { UrqlProvider } from "../organisms";

const ErrorPage = dynamic(() => import("./500"));

const NextProgressBar = dynamic<NextProgressBarProps>(
	() => import("@app/components").then((mod) => mod.NextProgressBar),
	{ ssr: false }
);

const REFETCH_INTERVAL = ms("5m") / 1_000;

export const CustomApp: NextComponentType<AppContext, AppInitialProps, AppProps> = ({
	Component,
	pageProps
}) => {
	return (
		<>
			<NextHead>
				<></>
			</NextHead>
			<GlobalStyles />
			<ErrorBoundary fallback={() => <ErrorPage />}>
				{({ error, fallback }) => (
					<SessionProvider
						session={pageProps.session}
						refetchInterval={REFETCH_INTERVAL}
						refetchOnWindowFocus
					>
						<UrqlProvider pageProps={pageProps}>
							<NextProgressBar />
							<Toaster position="bottom-left" />
							<LazyMotion>
								{error ? fallback : <Component {...pageProps} />}
							</LazyMotion>
						</UrqlProvider>
					</SessionProvider>
				)}
			</ErrorBoundary>
		</>
	);
};

export default CustomApp;
