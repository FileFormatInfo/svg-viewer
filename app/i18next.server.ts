import { createCookie } from "@remix-run/node";
import Backend from "i18next-fs-backend";
import { resolve } from "node:path";
import { RemixI18Next } from "remix-i18next/server";
import i18n from "~/i18n"; // i18n config file

export const localeCookie = createCookie("lng", {
  path: "/",
  sameSite: "lax",
  httpOnly: true,
});

import enTranslation from "../public/locales/en.json";
import frTranslation from "../public/locales/fr.json";

export const resources = {
    en: { translation: enTranslation },
    fr: { translation: frTranslation },
};

const i18nextServer = new RemixI18Next({
  detection: {
    supportedLanguages: i18n.supportedLngs,
    fallbackLanguage: i18n.fallbackLng,
    cookie: localeCookie,
  },
  i18next: {
    ...i18n,
    resources,
  },
  backend: Backend,
});

export default i18nextServer;
