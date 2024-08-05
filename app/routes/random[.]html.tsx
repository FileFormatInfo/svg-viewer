import type { LoaderFunctionArgs } from "@remix-run/node";
import { Await, useLoaderData } from "@remix-run/react";
import { Center, Flex, Spinner, Text, VStack } from "@chakra-ui/react";
import { redirect } from "@remix-run/node";
import { Suspense } from "react";

import { t } from "~/utils/i18n";

export async function loader({
    request,
}: LoaderFunctionArgs) {
    let hostname = new URL(request.url).searchParams.get('src');
    if (
        hostname == null ||
        /^(([a-z0-9]|[a-z0-9][-a-z0-9]*[a-z0-9])\.)+([a-z]{2,})$/.exec(hostname) ==
        null
    ) {
        hostname = "logosear.ch";
    }

    const zoom = new URL(request.url).searchParams.get('zoom') || "max";


    try {
        //LATER: for testing await new Promise(r => setTimeout(r, 1000))
        const resp = await fetch(`https://${hostname}/api/random.json?max=1`);
        const data = await resp.json();

        return redirect(`/view.html?url=${encodeURIComponent(data.results[0].url)}&zoom=${encodeURIComponent(zoom)}`);
    } catch (e: unknown) {
        const err = e instanceof Error ? e : new Error(`An error occurred ${e}`);
        return redirect(`/?error=${encodeURIComponent(err.message)}`);
    }
}

//LATER: neither is being shown...
export default function RandomImage() {
    const { url } = useLoaderData<typeof loader>();
    return (
        <Suspense fallback={<FullPageSpinner color="red" message={t("Loading...")} />}>
            <Await resolve={url}>
                {(url) => <FullPageSpinner color="blue" message={t("Redirecting...") + url} />}
            </Await>
        </Suspense>
    );
}

type IProps = {
    message: string;
    color: string;
}

function FullPageSpinner({ color, message }: IProps) {
    return (
        <Flex w="100vw" h="100vh" bg={"url(/images/backgrounds/memphis-mini.png)"}>
            <Center flex={1} bg={color}>
                <VStack>
                    <Spinner size="xl" />
                    <Text>{message}</Text>
                </VStack>
            </Center>
        </Flex>
    );
}
