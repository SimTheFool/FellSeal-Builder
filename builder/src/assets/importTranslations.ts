import frTranslations from "./translations/fr/*.tra";
import enTranslations from "./translations/en/*.tra";

export const importTranslations = () => {
  return {
    fr: aggregateTranslationsFiles(frTranslations),
    en: aggregateTranslationsFiles(enTranslations),
  };
};

const aggregateTranslationsFiles = (translations: Record<string, string>[]) => {
  return translations.reduce((acc, tra) => {
    return {
      ...acc,
      ...tra,
    };
  }, {});
};
