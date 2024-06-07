import { ChevronRightIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Icon,
  Link as ChLink,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useBrandColor } from "theme";

import { Link, useLocation } from "shared/Router";

import { INavItem } from "./INavItem";
import { useNavItems } from "./useNavItems";
import { ToggleModeButton } from "../../Components/ToggleModeButton";
import { LogoIcon } from "../../Components/LogoIcon";

export const DesktopNav = () => {
  const { pathname } = useLocation();
  const navItems = useNavItems();

  const linkColor = useColorModeValue("gray.600", "gray.200");
  const popoverContentBgColor = useColorModeValue("white", "gray.800");
  const brandColor = useBrandColor();

  return (
    <Stack direction="row" spacing={4}>
      <Flex>
        <LogoIcon boxSize={10} />
        <Text fontSize="xl" fontWeight="bold" ps={3} pt={1}>
          SVG View
        </Text>
      </Flex>
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }: INavItem) => {
  const brandColor = useBrandColor();

  return (
    <ChLink
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      role="group"
      display="block"
      p={2}
      rounded="md"
      _hover={{ bg: useColorModeValue("orange.50", "gray.900") }}
    >
      <Stack direction="row" align="center">
        <Box>
          <Text
            transition="all .3s ease"
            _groupHover={{ color: brandColor }}
            fontWeight="bold"
          >
            {label}
          </Text>
          <Text fontSize={"sm"}>{subLabel}</Text>
        </Box>
        <Flex
          transition="all .3s ease"
          transform="translateX(-10px)"
          opacity={0}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          justify="flex-end"
          align="center"
          flex={1}
        >
          <Icon color={brandColor} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </ChLink>
  );
};
