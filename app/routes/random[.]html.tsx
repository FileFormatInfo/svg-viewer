import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Await, useLoaderData, useNavigate, useSearchParams } from "@remix-run/react";
import { Center, Flex, Spinner, Text, VStack } from "@chakra-ui/react";
import { redirect } from "@remix-run/node";
import { Suspense, useEffect } from "react";

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
        await new Promise(r => setTimeout(r, 2000))
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
        <Flex w="100vw" h="100vh">
            <Center flex={1} bg={color}>
                <VStack>
                    <Spinner size="xl" />
                    <Text>{message}</Text>
                </VStack>
            </Center>
        </Flex>
    );
}

export async function action({
    request,
}: ActionFunctionArgs) {

    const formData = await request.formData();
    const url = await getRandomImage(formData.get("src") as string|null, formData.get("zoom") as string|null);

    return redirect(url);
}
