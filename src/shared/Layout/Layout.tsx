import { Spacer, VStack, chakra } from "@chakra-ui/react";

import { Outlet } from "shared/Router";

import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

export const Layout = () => {
  return (
    <chakra.main minH="100vh">
      <VStack w="100%" minH="100vh" spacing="0" style={{ overflow: "clip" }}>
        <Navbar />
        <Outlet />
        <Footer />
      </VStack>
    </chakra.main>
  );
};
