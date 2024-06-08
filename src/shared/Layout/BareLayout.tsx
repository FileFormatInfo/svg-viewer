import { chakra } from "@chakra-ui/react";

import { Outlet } from "shared/Router";

export const BareLayout = () => {
  return (
    <chakra.main>
      <chakra.div>
        <Outlet />
      </chakra.div>
    </chakra.main>
  );
};
