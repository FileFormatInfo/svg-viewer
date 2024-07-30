import {
    Box,
    Button,
    Heading,
    Input,
    Text,
    useColorModeValue,
    VStack,
} from "@chakra-ui/react";
import { Link as RemixLink } from "@remix-run/react";

import { t } from "~/utils/i18n";
import { FullPage } from "~/components/FullPage";

export default function OpenPage() {
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
                    bg={useColorModeValue("white", "gray.700")}
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