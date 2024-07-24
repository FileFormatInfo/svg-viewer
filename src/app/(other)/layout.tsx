"use client";

import { Flex, VStack, chakra } from "@chakra-ui/react";

import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <chakra.main minH="100vh" bg={"url(/images/backgrounds/memphis-mini.png)"}>
      <VStack w="100%" minH="100vh" spacing="0" style={{ overflow: "clip" }}>
        <Navbar />
        <Flex
          flex={1}
          direction="column"
          align="center"
          justify="center"
        >
          {children}
        </Flex>
        <Footer />
      </VStack>
    </chakra.main>
  );
}
