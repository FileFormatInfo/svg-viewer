import { MetaFunction, Link as RemixLink, useNavigate } from "react-router";

import { t } from "~/utils/i18n";
import { FullPage } from "~/components/FullPage";
import { useRef } from "react";

export const meta: MetaFunction = () => {
    return [
        { title: "Open URL - SVG View" },
        { name: "description", content: "Select an SVG image URL to view" },
    ];
};

export default function OpenPage() {
    const defaultImage = "https://svg-viewer.fileformat.info/favicon.svg";
    const urlRef = useRef<HTMLInputElement | null>(null);
    const navigate = useNavigate();

    const doSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        if (!urlRef.current) return;
        e.preventDefault();
        const url = urlRef.current.value;
        navigate(`/view.html?url=${encodeURIComponent(url)}`);
    };

    return (
        <FullPage>
            <div className="flex w-full max-w-lg flex-col gap-8">
                <div className="text-center">
                    <h1 className="text-3xl font-bold md:text-5xl">
                        {t("Select an SVG image")}
                    </h1>
                    <p className="text-base md:text-lg">{t("to preview")}</p>
                </div>
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <form action={`/view.html`} method="get" onSubmit={doSubmit} >
                        <input id="url" defaultValue={defaultImage} name="url" ref={urlRef} className="input input-bordered w-full" />
                        <button type="submit" className="btn btn-primary mt-4 w-full">
                            {t("Open")}
                        </button>
                        <RemixLink to="/" className="btn btn-outline mt-3 w-full no-underline">
                            {t("Cancel")}
                        </RemixLink>
                        </form>
                    </div>
                </div>
            </div>
        </FullPage>
    );
}
