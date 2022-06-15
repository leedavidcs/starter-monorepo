import type { GetServerSidePropsResult } from "next";
import { FC, ReactNode } from "react";
import { Provider } from "urql";
import { useUrql } from "../../hooks";

export interface UrqlProviderProps {
	children?: ReactNode;
	pageProps: GetServerSidePropsResult<any>;
}

export const UrqlProvider: FC<UrqlProviderProps> = ({ children, pageProps }) => {
	const urqlClient = useUrql(pageProps);

	return <Provider value={urqlClient}>{children}</Provider>;
};
