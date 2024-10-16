import {
    isRouteErrorResponse,
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    useRouteError,
} from "@remix-run/react";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { theme } from "~/theme";

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
                <ColorModeScript initialColorMode={theme.config.initialColorMode} />
            </head>
            <body>
                {children}
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    );
}
//                    {`@media (scripting: enabled) { .noscriptonly: { display: none !important; } }`}

export default function App() {
    return (
        <MyLayout>
            <ChakraProvider theme={theme}>
                <Outlet />
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

