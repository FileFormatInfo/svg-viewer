import type { MetaFunction } from "react-router";
import { isRouteErrorResponse, Link as RemixLink, useNavigate, useRouteError } from "react-router";
import type { LinksFunction } from "react-router";
import React from "react";

import { FullPage } from "~/components/FullPage";
import { t } from "~/utils/i18n";

export const meta: MetaFunction = () => {
    return [
        { title: "SVG Viewer" },
        { name: "description", content: "View your SVG images in a variety of sizes and backgrounds" },
    ];
};

export const links: LinksFunction = () => {
    return [
        { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
    ];
};

export default function HomePage() {
    const navigate = useNavigate();
    const fileInput = React.useRef<HTMLInputElement>(null);

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        const file = e.target.files?.item(0);
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const url = reader.result as string;
                navigate(`/view.html?url=${encodeURIComponent(url)}`);
            };
            reader.readAsDataURL(file);
        }
    }

    return (
        <FullPage>
            <div className="card w-full max-w-2xl bg-base-100 shadow-xl">
                <div className="card-body gap-4">

                    <div className="flex items-center gap-3">
                        <RemixLink to={`/open.html`} className="btn btn-neutral no-underline">
                            {t("Open URL")}
                        </RemixLink>
                        <p>{t("view an SVG image from another website")}</p>
                    </div>

                    <div className="flex items-center gap-3 scriptonly">
                        <input accept="image/svg+xml" onChange={onFileChange} type="file" style={{ "display": "none" }} ref={fileInput} />
                        <button type="button" onClick={() => fileInput.current?.click()} className="btn btn-neutral">
                            {t("Open File")}
                        </button>
                        <p>{t("view an SVG image from your computer (JS)")}</p>
                    </div>

                    <div className="noscriptonly">
                        <p>{t("Open File requires JavaScript in static mode")}</p>
                    </div>

                    <form action="/random.html" method="get">
                        <div className="flex items-center gap-3">
                            <input type="hidden" name="src" value="logosear.ch" />
                            <input type="hidden" name="zoom" value="max" />
                            <button type="submit" className="btn btn-neutral">
                                {t("Random Logo")}
                            </button>
                            <p>{t("view a random logo from LogoSear.ch")}</p>
                        </div>
                    </form>

                    <form action="/random.html" method="get">
                        <div className="flex items-center gap-3">
                            <input type="hidden" name="src" value="iconsear.ch" />
                            <input type="hidden" name="zoom" value="icons" />
                            <button type="submit" className="btn btn-neutral">
                                {t("Random Icon")}
                            </button>
                            <p>{t("view a random logo from IconSear.ch")}</p>
                        </div>
                    </form>

                </div>
            </div>
        </FullPage>
    )
}

/*
                    <HStack action={`/view.html`} as="form" className="noscriptonly">
                        <input accept="image/svg+xml" name="url" type="file" />
                        <Text>{t("view an SVG image from your computer")}</Text>
                        <Button type="submit">Open</Button>
                    </HStack>
*/

export function ErrorBoundary() {
    const error = useRouteError();
    if (isRouteErrorResponse(error)) {
        return (
            <div className="flex flex-col items-center gap-2">
                <img
                    alt="Error icon"
                    src="/images/error.svg"
                    style={{ width: "5rem", height: "5rem" }}
                />
                <p>{error.status} {error.statusText}</p>
                <p>{error.data}</p>
            </div>
        );
    } else if (error instanceof Error) {
        return (
            <div className="flex flex-col items-center gap-2">
                <img
                    alt="Error icon"
                    src="/images/error.svg"
                    style={{ width: "5rem", height: "5rem" }}
                />
                <p>{error.message}</p>
                <pre style={{ "display": "none" }}>{error.stack}</pre>
            </div>
        );
    } else {
        return <h1>Unknown Error</h1>;
    }
}


