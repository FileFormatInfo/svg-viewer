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

export const MobileToolbar = () => {
  const bg = useColorModeValue("white", "gray.800");

  return (
    <Stack
      p={4}
      display={{ md: "none" }}
      bg={bg}
      borderBottom={1}
      borderStyle="solid"
      borderColor={useColorModeValue("gray.200", "gray.900")}
    >
      <Text>Mobile</Text>
    </Stack>
  );
};

