import type { MetaFunction } from "@remix-run/node";

import {
  Box,
  Button,
  HStack,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { Link as RemixLink } from "@remix-run/react";

import { FullPage } from "~/components/FullPage";


import { t } from "~/utils/i18n";

export const meta: MetaFunction = () => {
  return [
    { title: "SVG View" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function HomePage() {
  return (
    <FullPage>
      <Box
        rounded="lg"
        bg={useColorModeValue("white", "gray.700")}
        boxShadow="lg"
        p={{ base: 6, md: 8 }}
      >
        <VStack as="form" align="left" spacing={4}>
          <HStack>
            <Button as={RemixLink} to={`/open.html`}>
              {t("Open")}
            </Button>
            <Text>{t("view an SVG image from another website")}</Text>
          </HStack>
          <HStack>
            <RemixLink prefetch="none" to={`/random.html?src=logosear.ch&zoom=max`} reloadDocument>
              <Button>
                {t("Random Logo")}
              </Button>
            </RemixLink>
            <Text>{t("view a random logo from LogoSear.ch")}</Text>
          </HStack>
          <HStack>
            <RemixLink prefetch="none" to={`/random.html?src=iconsear.ch&zoom=icons`} reloadDocument>
              <Button>
                {t("Random Icon")}
              </Button>
            </RemixLink>
            <Text>{t("view a random icon from IconSear.ch")}</Text>
          </HStack>
        </VStack>
      </Box>
    </FullPage>
  )
}
