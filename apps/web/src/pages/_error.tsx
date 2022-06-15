import { ErrorProps } from "next/error";
import React, { FC } from "react";

export const Page: FC<ErrorProps> = ({ statusCode, title }) => {
	return (
		<div>
			<div>{statusCode}</div>
			<div>{title ?? "Something went wrong"}</div>
		</div>
	);
};

export default Page;
