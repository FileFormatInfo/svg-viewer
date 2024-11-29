import {
    isRouteErrorResponse,
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    useRouteError,
} from "@remix-run/react";
import { Provider } from "~/components/ui/provider"
import { ChakraProvider } from "@chakra-ui/react"
import { ColorModeProvider } from "~/components/ui/color-mode"
//import { ColorModeScript } from "@chakra-ui/react";
//                <ColorModeScript initialColorMode={theme.config.initialColorMode} />

import { themeSystem } from "~/theme";

function MyLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <style>
                    {`@media (scripting: enabled) { .noscriptonly { display: none !important; }}`}
                </style>
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
    return (
        <MyLayout>
            <ChakraProvider value={themeSystem}>
                <ColorModeProvider enableSystem={true} defaultTheme="light">
                <Outlet />
                </ColorModeProvider>
            </ChakraProvider>
        </MyLayout>
    )
}

export function ErrorBoundary() {
    const err = useRouteError();
    console.error(err);
    let message = "An error occurred";
    if (isRouteErrorResponse(err)) {
        message = `${err.status} ${err.statusText}`;
    } else if (err instanceof Error) {
        message = err.message;
    }

    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>Error</title>
                <style>
                    {`
                        body {
                            font-family: system-ui, sans-serif;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            height: 100vh;
                            margin: 0;
                        }
                    `}
                </style>
            </head>
            <body>
                <img
                    alt="Error icon"
                    src="/images/error.svg"
                    style={{ width: "2.5rem", height: "2.5rem", marginRight: "0.5rem" }}
                />
                {message}
            </body>
        </html>
    );
}

