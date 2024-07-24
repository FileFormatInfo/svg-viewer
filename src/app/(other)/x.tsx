'use client' 

import {
	Box,
	Button,
	Flex,
	HStack,
	Text,
	useColorModeValue,
	VStack,
} from "@chakra-ui/react";

import { Link as NextLink } from "@chakra-ui/next-js";

function t(s: string) { return s; }


export default function Home() {

	return (
    <Flex
      flex={1}
      w="100%"
      h="100%"
      direction="column"
      align="center"
      justify="center"
    >
      <Box
        rounded="lg"
        bg={useColorModeValue("white", "gray.700")}
        boxShadow="lg"
        p={{ base: 6, md: 8 }}
      >
        <VStack as="form" align="left" spacing={4}>
          <HStack>
            <Button as={NextLink} href={"/open.html"}>
              {t("Open")}
            </Button>
            <Text>{t("view an SVG image from another website")}</Text>
          </HStack>
          <HStack>
            <Button as={NextLink} href="/random.html?src=logosear.ch">
              {t("Random Logo")}
            </Button>
            <Text>{t("view a random logo from LogoSear.ch")}</Text>
          </HStack>
          <HStack>
            <Button as={NextLink} href="/random.html?src=iconsear.ch">
              {t("Random Icon")}
            </Button>
            <Text>{t("view a random icon from IconSear.ch")}</Text>
          </HStack>
          //LATER: upload
        </VStack>
      </Box>
    </Flex>
  );
};

