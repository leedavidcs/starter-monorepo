import type { FieldInfo } from "@urql/exchange-graphcache";
import type { OperationContext } from "urql";
import { getApiUrl } from "../graphql/getApiUrl";

export class UrqlUtils {
	public static getFieldKey(field: FieldInfo): string {
		return `${field.fieldName}${
			field.arguments
				? `(${Object.entries(field.arguments)
						.map(([key, value]) => `${key}:${value}`)
						.join(",")})`
				: ""
		}`;
	}

	public static bypassCdn(): Partial<OperationContext> {
		return {
			fetch: (_, init) => fetch(getApiUrl({ bypassCdn: true }), init),
			fetchOptions: {
				credentials: "include",
				headers: {
					cookie: document.cookie,
					"graphcdn-bypass": "1"
				}
			}
		};
	}
}
