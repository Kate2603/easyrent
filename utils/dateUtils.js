import dayjs from "dayjs";
import "dayjs/locale/uk";
import "dayjs/locale/en";

export function formatDate(dateString, locale = "uk") {
  if (!dateString) return locale === "en" ? "Unknown" : "невідомо";

  const date = dayjs(dateString);
  if (!date.isValid()) return locale === "en" ? "Unknown" : "невідомо";

  return date.locale(locale).format("LL");
}
