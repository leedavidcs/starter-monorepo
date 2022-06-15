import _dayjs from "dayjs";
import enLocale from "dayjs/locale/en";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";

export type { ConfigType, Dayjs, ManipulateType } from "dayjs";

_dayjs.extend(relativeTime);
_dayjs.extend(updateLocale);
_dayjs.locale("en-short", {
	...enLocale,
	relativeTime: {
		future: "in %s",
		past: "%s ago",
		s: "%ds",
		m: "1m",
		mm: "%dm",
		h: "1hr",
		hh: "%dhrs",
		d: "1d",
		dd: "%dd",
		M: "1mo",
		MM: "%dmos",
		y: "1yr",
		yy: "%dyrs"
	}
});

export const dayjs = _dayjs;
