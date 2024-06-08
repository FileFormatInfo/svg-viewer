import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Collapse,
  Flex,
  Icon,
  Link as ChLink,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";

import { Link } from "shared/Router";


export const MobileNav = () => {
  const bg = useColorModeValue("white", "gray.800");

  return (
    <Stack
      position={"absolute"}
      p={4}
      bg={bg}
      borderBottom={1}
      borderStyle="solid"
      borderColor={useColorModeValue("black", "gray.900")}
    >
    <Flex
        py={2}
        border={1}
        as={Link}
        justify="space-between"
        align="center"
        _hover={{
          textDecoration: "none",
        }}
      >xxx
        <Text fontSize="xl" fontWeight="bold" ps={3} pt={1}>Placeholder</Text>
    </Flex>
    </Stack>
  );
};
