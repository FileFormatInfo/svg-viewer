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

import { t } from "utils";

import { InternalErrorResult } from "shared/Result";
import { Link as ReactRouterLink } from "shared/Router";
import { useRouteError } from "shared/Router";

const HomePage = () => {

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
						<Button as={ReactRouterLink} to={"/open.html"}>
							{t("Open")}
						</Button>
						<Text>{t("view an SVG image from another website")}</Text>
					</HStack>

					<HStack>
						<Button as={ReactRouterLink} to="/random.html?src=logosear.ch">
							{t("Random Logo")}
						</Button>
						<Text>{t("view a random logo from LogoSear.ch")}</Text>
					</HStack>

					<HStack>
						<Button as={ReactRouterLink} to="/random.html?src=iconsear.ch">
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

export const Component = HomePage;

export const ErrorBoundary = () => {
	const error = useRouteError();

	if (error.status === 404) {
		return <HomePage />;
	}

	return <InternalErrorResult />;
};
