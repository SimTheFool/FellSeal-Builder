import {
  I18nextProvider,
  initReactI18next,
  useTranslation,
} from "react-i18next";
import i18n from "i18next";
import { useEffect, useState } from "react";
import { newClient } from "builder";
import { useBuilderQuery } from "../builder/useQuery";

const { queries } = newClient();

i18n.use(initReactI18next).init({
  resources: {},
  lng: "fr",
  fallbackLng: "fr",
  react: {
    bindI18n: "loaded languageChanged",
    bindI18nStore: "added",
    useSuspense: true,
  },
});

export const TranslationProvider = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const [translationFr = {}] = useBuilderQuery(queries.getTranslation)("fr");
  const [translationEn = {}] = useBuilderQuery(queries.getTranslation)("en");

  useEffect(() => {
    i18n.addResourceBundle("en", "translation", translationEn);
    i18n.addResourceBundle("fr", "translation", translationFr);
  }, [translationFr, translationEn]);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};

export const useTranslate = useTranslation;
