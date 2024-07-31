import { PiSunBold, PiMoonBold } from "react-icons/pi";

import {
  Icon,
  IconButton,
  useColorMode,
  IconButtonProps,
} from "@chakra-ui/react";

const ToggleModeButton = (
  props: Omit<IconButtonProps, "aria-label" | "onClick" | "variant" | "icon">
) => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <IconButton
      aria-label="Switch mode"
      className="scriptonly"
      onClick={toggleColorMode}
      variant="ghost"
      icon={
        colorMode === "light" ? (
          <Icon boxSize="1.5em" as={PiMoonBold} />
        ) : (
          <Icon boxSize="1.5em" as={PiSunBold} />
        )
      }
      {...props}
    />
  );
};

export { ToggleModeButton };
