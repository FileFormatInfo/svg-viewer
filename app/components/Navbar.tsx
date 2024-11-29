import {
    Box,
    Flex,
    Text,
    HStack,
    Spacer,
    Group,
    IconButton,
    Icon,
} from "@chakra-ui/react";
import { Link as RemixLink } from "@remix-run/react";
import { useColorModeValue } from "~/components/ui/color-mode";

import { LuVoicemail } from "react-icons/lu"

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
                    <Spacer/>
                    <Group attached>
                        <IconButton variant="outline"><LuVoicemail /></IconButton>
                        <IconButton variant="outline"><LuVoicemail /></IconButton>
                        <IconButton variant="outline"><RemixLink to="/"><Icon fontSize="4xl"><LuVoicemail /></Icon></RemixLink></IconButton>
                    </Group>
                    <IconButton size="lg" variant="outline"><Icon fontSize="40px"><LuVoicemail /></Icon></IconButton>
                    <Icon fontSize="40px"><LuVoicemail /></Icon>
                    <HStack direction={"row"} gap={4}>
                        <ToggleModeButton />
                    </HStack>
                </Flex>
            </Flex>
        </Box>
    );
};
/*
                <Flex flex="1">
                    <HStack gap={4}>
                            <LogoIcon boxSize={10} />
                            <Text fontSize="xl" fontWeight="bold" ps={3} pt={1}>
                                SVG View
                            </Text>
                        </RemixLink>
                    </HStack>
                </Flex>
                <HStack direction={"row"} gap={4}>
                    <ToggleModeButton />
                </HStack>
            </Flex>
            */
