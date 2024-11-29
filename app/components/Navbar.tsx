import {
    Box,
    Flex,
    Text,
    HStack,
    Spacer,
} from "@chakra-ui/react";
import { Link as RemixLink } from "@remix-run/react";
import { useColorModeValue } from "~/components/ui/color-mode";


import { ToggleModeButton } from "./ToggleModeButton";
import { LogoIcon } from "./LogoIcon";

export const Navbar = () => {
    const bg = useColorModeValue("white", "gray.800");
    const borderColor = useColorModeValue("gray.200", "gray.900");

    return (
        <Box w="100%" position="fixed" zIndex="10">
            <Flex
                w="100%"
                minH="60px"
                py={2}
                px={4}
                borderBottom={1}
                borderStyle="solid"
                borderColor={borderColor}
                align="center"
                bg={bg}
            >
                <Flex flex="1">
                    <HStack gap={4} asChild>
                        <RemixLink to="/">
                            <LogoIcon boxSize={10} />
                            <Text fontSize="xl" fontWeight="bold" ps={3} pt={1}>
                                SVG View
                            </Text>
                        </RemixLink>
                    </HStack>
                    <Spacer />
                    <HStack direction={"row"} gap={4}>
                        <ToggleModeButton />
                    </HStack>
                </Flex>
            </Flex>
        </Box>
    );
};

