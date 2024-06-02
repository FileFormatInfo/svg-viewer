import React from "react";
import { PiSunBold } from "react-icons/pi";



import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import { Icon, IconButton, useColorMode, IconButtonProps } from "@chakra-ui/react";


const ToggleModeButton = (
  props: Omit<IconButtonProps, "aria-label" | "onClick" | "variant" | "icon">
) => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <IconButton
      aria-label="Switch mode"
      onClick={toggleColorMode}
      variant="ghost"
      icon={colorMode === "light" ? <MoonIcon /> : <Icon boxSize="1.5em" as={PiSunBold} />}
      {...props}
    />
  );
};

export { ToggleModeButton };