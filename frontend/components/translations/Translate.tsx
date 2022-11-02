import {
  I18nextProvider,
  initReactI18next,
  useTranslation,
} from "react-i18next";
import i18n from "i18next";
import { useEffect } from "react";

const en = {
  "Welcome to React": "Wddddt",
};

const fr = {
  "Welcome to React": "aaaaaxxxxx",
};

const setTranslations = ([en, fr]: [
  Record<string, string>,
  Record<string, string>
]) => {
  i18n.use(initReactI18next).init({
    resources: {
      en: { translation: en },
      fr: { translation: fr },
    },
    lng: "en",
    fallbackLng: "en",
  });
};

export const TranslationProvider = ({
  children,
}: {
  children: JSX.Element;
}) => {
  useEffect(() => {
    setTranslations([en, fr]);
  }, []);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};

export const useTranslate = useTranslation;
