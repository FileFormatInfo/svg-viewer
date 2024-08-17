import {
    isRouteErrorResponse,
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    useRouteError,
} from "@remix-run/react";
import { ChakraProvider, Text, VStack } from "@chakra-ui/react";
import { FullPage } from "./components/FullPage";

function MyLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
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
    return (
        <MyLayout>
            <ChakraProvider>
                <Outlet />
            </ChakraProvider>
        </MyLayout>
    )
}

function ErrorDisplay({ error }: { error: unknown }) {
    if (isRouteErrorResponse(error)) {
        return (
            <VStack>
                <img
                    alt="Error icon"
                    src="/images/error.svg"
                    style={{ width: "5rem", height: "5rem" }}
                />
                <Text>{error.status} {error.statusText}</Text>
                <Text>{error.data}</Text>
            </VStack>
        );
    } else if (error instanceof Error) {
        return (
            <VStack>
                <img
                    alt="Error icon"
                    src="/images/error.svg"
                    style={{ width: "5rem", height: "5rem" }}
                />
                <Text>{error.message}</Text>
                <pre style={{ "display": "none" }}>{error.stack}</pre>
            </VStack>
        );
    } else {
        return <h1>Unknown Error</h1>;
    }
}

export function ErrorBoundary() {
    const error = useRouteError();
    console.error(error);
    return (
        <MyLayout>
            <ChakraProvider>
                <FullPage>
                    <ErrorDisplay error={error} />
                </FullPage>
            </ChakraProvider>
        </MyLayout>
    );
}

