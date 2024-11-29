import { PiSunBold, PiMoonBold } from "react-icons/pi";

import {
  Icon,
  IconButton,
  IconButtonProps,
} from "@chakra-ui/react";
import { useColorMode } from "~/components/ui/color-mode";

const DummyToggleModeButton = (props:any) => {
    return (<></>);
}

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
      {...props}
    > {
    colorMode === "light" ? (
    <Icon fontSize="1.5em"><PiMoonBold /></Icon>
) : (
    <Icon fontSize="1.5em"><PiSunBold/></Icon>
)
      }
        </IconButton>
  );
};

export {
    ToggleModeButton as Dummy,
    DummyToggleModeButton as ToggleModeButton,
 };
