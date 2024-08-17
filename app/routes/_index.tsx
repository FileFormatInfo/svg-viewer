import type { MetaFunction } from "@remix-run/react";

import {
    Box,
    Button,
    HStack,
    Text,
    useColorModeValue,
    VStack,
} from "@chakra-ui/react";
import { Link as RemixLink } from "@remix-run/react";

import { FullPage } from "~/components/FullPage";


import { t } from "~/utils/i18n";
import { LinksFunction } from "@remix-run/node";

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
    const bg = useColorModeValue("white", "gray.700");

    return (
        <FullPage>
            <Box
                rounded="lg"
                bg={bg}
                boxShadow="lg"
                p={{ base: 6, md: 8 }}
            >
                <VStack as="form" align="left" spacing={4}>
                    <HStack>
                        <Button as={RemixLink} to={`/open.html`}>
                            {t("Open")}
                        </Button>
                        <Text>{t("view an SVG image from another website")}</Text>
                    </HStack>
                    <HStack>
                        <RemixLink prefetch="none" to={`/random.html?src=logosear.ch&zoom=max`} reloadDocument>
                            <Button>
                                {t("Random Logo")}
                            </Button>
                        </RemixLink>
                        <Text>{t("view a random logo from LogoSear.ch")}</Text>
                    </HStack>
                    <HStack>
                        <RemixLink prefetch="none" to={`/random.html?src=iconsear.ch&zoom=icons`} reloadDocument>
                            <Button>
                                {t("Random Icon")}
                            </Button>
                        </RemixLink>
                        <Text>{t("view a random icon from IconSear.ch")}</Text>
                    </HStack>
                </VStack>
            </Box>
        </FullPage>
    )
}
