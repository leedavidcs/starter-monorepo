import { requestPolicyExchange as urqlRequestPolicyExchange } from "@urql/exchange-request-policy";
import ms from "ms";
import type { Exchange, Operation } from "urql";
import { getOperationName } from "urql";

export const requestPolicyExchange = (): Exchange => {
	return urqlRequestPolicyExchange({
		ttl: ms("5m"),
		shouldUpgrade: (op: Operation) => {
			const operationName = getOperationName(op.query);

			switch (operationName) {
				case "GetActivityFeed":
				case "GetCodeExampleComments":
				case "GetCommentReplies":
				case "GetPostComments":
				case "GetUserActivities":
				case "GetUserFollowers":
				case "GetUserFriendRequests":
				case "GetUserFriends":
				case "SuggestFriends":
					return true;
				default:
			}

			return false;
		}
	});
};
