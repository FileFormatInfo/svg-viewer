'use client'

import {
  Box,
  Button,
  Flex,
  HStack,
  Link,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";

import { t } from "../utils/i18n";
import { suffix } from "../utils/pathfix";

import { Link as NextLink } from "@chakra-ui/next-js";

export default function HomePage() {
  return (
      <Box
        rounded="lg"
        bg={useColorModeValue("white", "gray.700")}
        boxShadow="lg"
        p={{ base: 6, md: 8 }}
      >
        <VStack as="form" align="left" spacing={4}>
          <HStack>
            <Button as={NextLink} href={`/open${suffix}`}>
              {t("Open")}
            </Button>
            <Text>{t("view an SVG image from another website")}</Text>
          </HStack>
          <HStack>
          <Button as={NextLink} href={`/random${suffix}?src=logosear.ch`}>
              {t("Random Logo")}
            </Button>
            <Text>{t("view a random logo from LogoSear.ch")}</Text>
          </HStack>
          <HStack>
          <Button as={NextLink} href={`/random${suffix}?src=iconsear.ch`}>
              {t("Random Icon")}
            </Button>
            <Text>{t("view a random icon from IconSear.ch")}</Text>
          </HStack>
        </VStack>
      </Box>
  );
};
