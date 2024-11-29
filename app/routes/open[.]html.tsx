import {
    Box,
    Button,
    Heading,
    Input,
    Text,
    VStack,
} from "@chakra-ui/react";
import { MetaFunction, Link as RemixLink, useNavigate } from "@remix-run/react";
import { useColorModeValue } from "~/components/ui/color-mode";

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
    const bg = useColorModeValue("white", "gray.700");
    const defaultImage = "https://view.svg.zone/favicon.svg";
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
            <VStack align="stretch" gap={8} w="100%" maxW="lg">
                <VStack textAlign="center">
                    <Heading fontSize={{ base: "2xl", md: "4xl" }}>
                        {t("Select an SVG image")}
                    </Heading>
                    <Text fontSize={{ base: "md", md: "lg" }}>{t("to preview")}</Text>
                </VStack>
                <Box
                    rounded="lg"
                    bg={bg}
                    boxShadow="lg"
                    p={{ base: 6, md: 8 }}
                >
                    <VStack asChild gap={4}>
                        <form action={`/view.html`} method="get" onSubmit={doSubmit} >
                        <Input id="url" defaultValue={defaultImage} name="url" ref={urlRef} />
                        <Button type="submit" colorScheme="blue" w="100%">
                            {t("Open")}
                        </Button>
                        <Button
                            asChild
                            colorScheme="blue"
                            variant="outline"
                            w="100%"
                        >
                                <RemixLink to="/">
                            {t("Cancel")}
                            </RemixLink>
                        </Button>
                        </form>
                    </VStack>
                </Box>
            </VStack>
        </FullPage>
    );
}
