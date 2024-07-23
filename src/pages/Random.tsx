/* eslint-disable no-console */
import { useEffect, useState } from "react";

import { Center, Flex, Spinner, Text, VStack } from "@chakra-ui/react";

import { t } from "utils";

import { useNavigate, useSearchParams } from "shared/Router";

export const RandomImage = () => {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();

	let hostname = searchParams.get("src");
	if (
		hostname == null ||
		/^(([a-z0-9]|[a-z0-9][a-z0-9\-]*[a-z0-9])\.)+([a-z]{2,})$/.exec(hostname) ==
			null
	) {
		hostname = "logosear.ch";
	}
	useEffect(() => {
		const abortController = new AbortController();
		(async () => {
			try {
				console.log(`fetching random image`);
				const resp = await fetch(`https://${hostname}/api/random.json?max=1`, {
					signal: abortController.signal,
				});
				const data = await resp.json();

				setTimeout(() => {
					console.log(`random image: ${data.results[0].url}`);
					navigate(
						`/view.html?url=${encodeURIComponent(
							data.results[0].url
						)}&zoom=max`,
						{ replace: true }
					);
				}, 2500);
			} catch (err) {
				console.error(err);
				if (err instanceof Error && err.name !== "AbortError") {
					navigate(`/open.html?error=${encodeURIComponent(err.name)}`);
				}
			}
		})();

		return () => abortController.abort();
	}, []);

	return (
		<Flex w="100vw" h="100vh">
			<Center flex={1}>
				<VStack>
					<Spinner size="xl" />
					<Text>{t("Loading...")}</Text>
				</VStack>
			</Center>
		</Flex>
	);
};

export const Component = RandomImage;
