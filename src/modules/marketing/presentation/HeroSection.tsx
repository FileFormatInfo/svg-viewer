import { Box, Heading, Container, Text, Button, Stack, Icon, VStack, useColorModeValue, createIcon } from "@chakra-ui/react";
import { useBrandColor, useSecondaryTextColor } from "theme";



import { t } from "utils";

import { Link } from "shared/Router";


interface IProps {
  productNumber: number;
}

const HeroSection = ({ productNumber }: IProps) => {
  const brandColor = useBrandColor();
  const textColor = useSecondaryTextColor();

  return (
    <Container maxW="3xl">
      <Stack
        textAlign="center"
        spacing={{ base: 8, md: 14 }}
        pt={{ base: 20, md: 36 }}
        pb={{ base: 16, md: 20 }}
      >
        <Heading
          fontWeight="extrabold"
          fontSize={{ base: "3xl", sm: "4xl", md: "6xl", lg: "7xl" }}
          lineHeight={"110%"}
        >
          SVG Image Preview
        </Heading>
        <Text fontSize={{ base: "md", md: "lg", lg: "xl" }} color={textColor}>
          View your SVG images against a variety of backgrounds with
          customizable zoom that works on phones, tablets and desktops.
        </Text>
        <VStack
          spacing={3}
          align="center"
          alignSelf="center"
          position="relative"
        >
          <Button as={Link} colorScheme="green" variant="solid" size="lg" px={6} to="/open.html">
            {t("Open URL")}
          </Button>
        </VStack>
      </Stack>
    </Container>
  );
};

export { HeroSection };