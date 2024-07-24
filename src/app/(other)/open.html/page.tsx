"use client";

import {
  Box,
  Button,
  Heading,
  Input,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { Link as NextLink } from "@chakra-ui/next-js";

import { t } from "../../utils/i18n";

export default function OpenPage() {
  const defaultImage = "https://view.svg.zone/favicon.svg";

  return (
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
        <VStack action="/view.html" as="form" method="get" spacing={4}>
          <Input id="url" defaultValue={defaultImage} name="url" />

          <Button type="submit" colorScheme="blue" w="100%">
            {t("Open")}
          </Button>

          <Button
            as={NextLink}
            href="/"
            colorScheme="blue"
            variant="outline"
            w="100%"
          >
            {t("Cancel")}
          </Button>
        </VStack>
      </Box>
    </VStack>
  );
}
