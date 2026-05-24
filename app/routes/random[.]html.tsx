import { useNavigate, useSearchParams } from "react-router";
import { useEffect } from "react";

import { t } from "~/utils/i18n";
import { FullPage } from "~/components/FullPage";


async function getRandomImage(hostname: string|null, zoom: string|null): Promise<string> {
    if (
        hostname == null ||
        !/^(([a-z0-9]|[a-z0-9][-a-z0-9]*[a-z0-9])\.)+([a-z]{2,})$/.test(hostname)
    ) {
        hostname = "logosear.ch";
    }

    zoom = zoom || "max";

    try {
        //await new Promise(r => setTimeout(r, 2000))
        const resp = await fetch(`https://${hostname}/api/random.json?max=1`);
        const data = await resp.json();

        return `/view.html?url=${encodeURIComponent(data.results[0].url)}&zoom=${encodeURIComponent(zoom)}`;

    } catch (e: unknown) {
        console.log('error calling random image API', hostname, e);
        const err = e instanceof Error ? e : new Error(`An error occurred ${e}`);
        throw (err);
    }
}


export default function RandomImage() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        getRandomImage(searchParams.get('src'), searchParams.get('zoom'))
        .then(url => navigate(url));
    }, [searchParams, navigate]);

    return (
        <FullPage>
            <FullPageSpinner message={t("Loading...")} />
        </FullPage>
    );
}

type IProps = {
    message: string;
    color?: string;
}

function FullPageSpinner({ color, message }: IProps) {
    return (
        <div className="flex h-screen w-screen">
            <div className="flex flex-1 flex-col items-center justify-center" style={{ backgroundColor: color }}>
                <span className="loading loading-spinner loading-lg" />
                <p>{message}</p>
            </div>
        </div>
    );
}

