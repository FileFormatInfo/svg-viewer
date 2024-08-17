import {
    Box,
    Button,
    Heading,
    Input,
    Text,
    useColorModeValue,
    VStack,
} from "@chakra-ui/react";
import { MetaFunction, Link as RemixLink } from "@remix-run/react";

import { t } from "~/utils/i18n";
import { FullPage } from "~/components/FullPage";

export const meta: MetaFunction = () => {
    return [
        { title: "Open URL - SVG View" },
        { name: "description", content: "Select an SVG image URL to view" },
    ];
};

export default function OpenPage() {
    const bg = useColorModeValue("white", "gray.700");
    const defaultImage = "https://view.svg.zone/favicon.svg";

    return (
        <FullPage>
            <VStack align="stretch" spacing={8} w="100%" maxW="lg">
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
                    <VStack action={`/view.html`} as="form" method="get" spacing={4}>
                        <Input id="url" defaultValue={defaultImage} name="url" />
                        <Button type="submit" colorScheme="blue" w="100%">
                            {t("Open")}
                        </Button>
                        <Button
                            as={RemixLink}
                            to="/"
                            colorScheme="blue"
                            variant="outline"
                            w="100%"
                        >
                            {t("Cancel")}
                        </Button>
                    </VStack>
                </Box>
            </VStack>
        </FullPage>
    );
}
