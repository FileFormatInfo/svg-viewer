import {
  Box,
  Flex,
  Text,
  HStack,
  useColorModeValue,
  Stack,
} from "@chakra-ui/react";
import { Link as RemixLink } from "@remix-run/react";


import { ToggleModeButton } from "./ToggleModeButton";
import { LogoIcon } from "./LogoIcon";

export const Navbar = () => {
  const bg = useColorModeValue("white", "gray.800");

  return (
    <Box w="100%" position="fixed" zIndex="10">
      <Flex
        w="100%"
        minH="60px"
        py={2}
        px={4}
        borderBottom={1}
        borderStyle="solid"
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align="center"
        bg={bg}
      >
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <Stack direction="row" spacing={4}>
              <Flex as={RemixLink} to="/">
                <LogoIcon boxSize={10} />
                <Text fontSize="xl" fontWeight="bold" ps={3} pt={1}>
                  SVG View
                </Text>
              </Flex>
            </Stack>
          </Flex>
        </Flex>
        <HStack direction={"row"} spacing={4}>
          <ToggleModeButton />
        </HStack>
      </Flex>
    </Box>
  );
};
