import { useLocale } from "../contexts/LocaleContext";
import { STRINGS } from "../locales/strings";

export function useStrings() {
  const { locale } = useLocale();

  const strings = STRINGS[locale] || STRINGS["uk"];

  // Повертаємо і рядки, і локаль
  return { strings, locale };
}
