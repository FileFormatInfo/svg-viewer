import { Spacer, chakra } from "@chakra-ui/react";

import { Outlet } from "shared/Router";

import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

export const Layout = () => {
  return (
    <chakra.main minH="100vh">
      <Navbar />
      <chakra.div flex={1} pt={{ base: 20, md: 24 }} pb={{ base: 4, md: 6 }}>
        <Outlet />
      </chakra.div>
      <Footer />
    </chakra.main>
  );
};
