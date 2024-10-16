import type { MetaFunction } from "@remix-run/react";

import {
    Box,
    Button,
    HStack,
    Input,
    Text,
    useColorModeValue,
    VStack,
} from "@chakra-ui/react";
import { isRouteErrorResponse, redirect, Link as RemixLink, useNavigate, useRouteError } from "@remix-run/react";

import { FullPage } from "~/components/FullPage";


import { t } from "~/utils/i18n";
import { LinksFunction } from "@remix-run/node";
import React from "react";

export const meta: MetaFunction = () => {
    return [
        { title: "SVG View" },
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
    const bg = useColorModeValue("white", "gray.700");
    const fileInput = React.useRef<HTMLInputElement>(null);

    const randomSubmit = (e: React.FormEvent<HTMLDivElement>,hostname: string, zoom: string) => {
        e.preventDefault();
        navigate(`/random.html?src=${hostname}&zoom=${zoom}`);
    }

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
            <Box
                rounded="lg"
                bg={bg}
                boxShadow="lg"
                p={{ base: 6, md: 8 }}
            >
                <VStack align="left" spacing={4}>

                    <HStack>
                        <Button as={RemixLink} to={`/open.html`}>
                            {t("Open URL")}
                        </Button>
                        <Text>{t("view an SVG image from another website")}</Text>
                    </HStack>

                    <HStack as="form" className="scriptonly">
                        <input accept="image/svg+xml" onChange={onFileChange} type="file" style={{ "display": "none" }} ref={fileInput} />
                        <Button onClick={() => fileInput.current?.click()}>
                            {t("Open File")}
                        </Button>
                        <Text>{t("view an SVG image from your computer (JS)")}</Text>
                    </HStack>

                    <HStack action={`/localpost`} as="form" encType="multipart/form-data" method="post" onSubmit={() => { console.log("how is this happening w/noscript???"); }} className="noscriptonly">
                        <input accept="image/svg+xml" name="imgfile" type="file" />
                        <Button type="submit">Open</Button>
                    </HStack>

                    <HStack action="/random.html" as="form" method="post" onSubmit={(e) => randomSubmit(e, 'logosear.ch', 'max')}>
                        <Button type="submit">
                            {t("Random Logo")}
                        </Button>
                        <Text>{t("view a random logo from LogoSear.ch")}</Text>
                    </HStack>

                    <HStack action="/random.html" as="form" method="post" onSubmit={(e) => randomSubmit(e, 'iconsear.ch', 'max')}>
                        <input type="hidden" name="src" value="iconsear.ch" />
                        <input type="hidden" name="zoom" value="icons" />
                        <Button type="submit">
                            {t("Random Icon")}
                        </Button>
                        <Text>{t("view a random logo from IconSear.ch")}</Text>
                    </HStack>

                </VStack>
            </Box>
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


