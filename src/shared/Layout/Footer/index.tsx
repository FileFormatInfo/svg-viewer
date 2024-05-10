import { ReactNode } from "react";

import {
  Box,
  Container,
  Link,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

export const Footer = () => {
  const bg = useColorModeValue("gray.50", "gray.900");
  const color = useColorModeValue("gray.700", "gray.200");
  return (
    <Box bg={bg} color={color}>
      <Container as={Stack} maxW="1340px" py={10}>
        <SimpleGrid
          templateColumns={{ sm: "1fr 1fr", md: "2fr 1fr 1fr 1fr 1fr" }}
          spacing={8}
        >
          <Text fontSize="sm">
            © {new Date().getFullYear()} VectorLogoZone. All rights reserved
          </Text>
          <Link href="https://github.com/VectorLogoZone/svg-preview">Source</Link>
          <Link href="https://github.com/VectorLogoZone/svg-preview">Share</Link>
        </SimpleGrid>
      </Container>
    </Box>
  );
};

