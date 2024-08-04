import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useRouteLoaderData,
} from "@remix-run/react";
import { ChakraProvider } from "@chakra-ui/react";
import { json, LoaderFunctionArgs } from "@remix-run/node";
import { useChangeLanguage } from "remix-i18next/react";
import i18nextServer, { localeCookie } from "~/i18next.server";

export const handle = { i18n: ["translation"] };

export const loader = async ({ request }: LoaderFunctionArgs) => {
    const locale = await i18nextServer.getLocale(request);
    console.log("locale", locale);
    return json(
        { locale },
        { headers: { "Set-Cookie": await localeCookie.serialize(locale) } },
    );
};


export function Layout({ children }: { children: React.ReactNode }) {
    const loaderData = useRouteLoaderData<typeof loader>("root");

    console.log("loaderData", loaderData);

    return (
      <html lang={loaderData?.locale ?? "en"}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <noscript>
        <style>
          {`.scriptonly { display: none !important; }`}
        </style>
        </noscript>
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
    const { locale } = useLoaderData<typeof loader>();
    useChangeLanguage(locale);
    return (
        <ChakraProvider>
            <Outlet />
        </ChakraProvider>
    )
}
