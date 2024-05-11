import { chakra } from "@chakra-ui/react";

import { Outlet } from "shared/Router";

import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

export const BareLayout = () => {
  return (
    <chakra.main>
      <chakra.div>
        <Outlet />
      </chakra.div>
    </chakra.main>
  );
};
