import {
    isRouteErrorResponse,
    type LinksFunction,
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    useRouteError,
} from "react-router";
import { ColorModeProvider } from "~/components/ui/color-mode"
import appStylesHref from "~/app.css?url";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: appStylesHref }];

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
            <body className="min-h-screen bg-base-200 text-base-content">
                {children}
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    );
}

export function HydrateFallback() {
    return (
        <MyLayout>
            <main
                style={{
                    minHeight: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "url(/images/backgrounds/memphis-mini.png)",
                    fontFamily: "system-ui, sans-serif",
                }}
            >
                <div
                    style={{
                        background: "white",
                        borderRadius: "0.75rem",
                        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.12)",
                        padding: "1rem 1.25rem",
                        color: "#1a202c",
                    }}
                >
                    Loading SVG Viewer...
                </div>
            </main>
        </MyLayout>
    );
}

export default function App() {
    return (
        <MyLayout>
                <ColorModeProvider enableSystem={false} defaultTheme="light">
                <Outlet />
                </ColorModeProvider>
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

