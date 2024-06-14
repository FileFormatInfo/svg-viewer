import { useEffect } from 'react';



import { Center, Flex, Spinner } from '@chakra-ui/react';



import { useNavigate } from "shared/Router";


export const RandomImage = () => {
	const navigate = useNavigate();
	useEffect(() => {
		(async () => {
			try {
				const resp = await fetch("https://logosear.ch/api/random.json?max=1");
				const data = await resp.json();

				setTimeout(() => {
					navigate(`/view.html?url=${encodeURIComponent(data.results[0].url)}&zoom=max`);
				}, 1000);
			} catch (e) {
				console.error(e);
				navigate("/open.html");
			}
		})();

		return () => {};
	});


	return <Flex w="100vw" h="100vh">
		<Center flex={1}>
			<Spinner size="xl" />
		</Center>
	</Flex>;
};

export const Component = RandomImage;