import { Box, Button, Flex, HStack, Link, Text, useColorModeValue, VStack } from "@chakra-ui/react";



import { t } from "utils";



import { Page } from "shared/Layout";
import { InternalErrorResult } from "shared/Result";
import { useRouteError } from "shared/Router";
import { useNavigate, useSearchParams } from "shared/Router";


const HomePage = () => {
  const navigate = useNavigate();

  return (
      <Flex flex={1} w="100%" h="100%" direction="column" align="center" justify="center">
		      <Box
        rounded="lg"
        bg={useColorModeValue("white", "gray.700")}
        boxShadow="lg"
        p={{ base: 6, md: 8 }}
      >
        <VStack
          as="form"
		  align="left"
          spacing={4}
        >

		<HStack>
        <Button onClick={
          () => navigate("/open.html")
        }>{t("Open")}</Button>
		<Text>{t("view an SVG image from another website")}</Text>
		</HStack>

		<HStack>
        <Button onClick={
          () => navigate("/random.html?src=logosear.ch")
        }>{t("Random Logo")}</Button>
		<Text>{t("view a random logo from LogoSear.ch")}</Text>
		</HStack>

		<HStack>
        <Button onClick={
          () => navigate("/random.html?src=iconsear.ch")
        }>{t("Random Icon")}</Button>
		<Text>{t("view a random icon from IconSear.ch")}</Text>
		</HStack>

        <Button display="none" onClick={ //LATER: upload
          () => navigate("/open.html")
        }>Upload</Button>
		</VStack>
		</Box>
      </Flex>
  );
};

export const Component = HomePage;

export const ErrorBoundary = () => {
  const error = useRouteError();

  if (error.status === 404) {
    return <HomePage/>;
  }

  return <InternalErrorResult />;
};