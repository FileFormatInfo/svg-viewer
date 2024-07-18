import React from "react";
import { PiArrowSquareOutBold, PiCheckerboardFill, PiSelectionSlashLight, PiSelectionLight, PiSquare, PiSquareBold, PiSquareFill, PiSquareLight, PiScribbleBold, PiMagnifyingGlassMinusBold, PiMagnifyingGlassPlusBold, PiArrowsOutCardinalBold, PiArrowsInCardinalBold, PiBug } from "react-icons/pi";



import { ButtonGroup, Button, Flex, Icon, IconButton, Spacer, Text, useColorModeValue } from "@chakra-ui/react";
import { useBrandColor } from "theme";



import { getQueryStringParam, setQueryStringParam } from "utils/querystring";
import { safeParseFloat } from "utils/safeParseFloat";



import { LogoIcon } from "shared/Components";
import { ToggleModeButton } from "shared/Components";
import { Link, useNavigate, useSearchParams } from "shared/Router";


interface IProps {
  boxSize: string;
  size: string;
}

export const BackgroundButtons = ({ size, boxSize }: IProps) => {
  const navigate = useNavigate();

  const currentBg = getQueryStringParam("bg", "memphis-mini")

  return (
    <ButtonGroup isAttached>
      <IconButton
        aria-label="Squiggles background"
        size={size}
        title="Squiggles background"
        isActive={currentBg === "memphis-mini"}
        icon={
          <Icon
            boxSize={boxSize}
            as={PiScribbleBold}
            onClick={() =>
              navigate(
                `/view.html?${setQueryStringParam("bg", "memphis-mini")}`
              )
            }
          />
        }
      />
      <IconButton
        aria-label="Checkboard background"
        isActive={currentBg === "checkerboard"}
        size={size}
        title="Checkboard background"
        icon={
          <Icon
            boxSize={boxSize}
            as={PiCheckerboardFill}
            onClick={() =>
              navigate(
                `/view.html?${setQueryStringParam("bg", "checkerboard")}`
              )
            }
          />
        }
      />
      <IconButton
        aria-label="Light background"
        isActive={currentBg === "#eeeeee"}
        size={size}
        title="Light background"
        icon={
          <Icon
            boxSize={boxSize}
            as={useColorModeValue(PiSquare, PiSquareFill)}
            onClick={() =>
              navigate(`/view.html?${setQueryStringParam("bg", "#eeeeee")}`)
            }
          />
        }
      />
      <IconButton
        aria-label="Dark background"
        isActive={currentBg === "#111111"}
        size={size}
        title="Dark background"
        icon={
          <Icon
            boxSize={boxSize}
            as={useColorModeValue(PiSquareFill, PiSquare)}
            onClick={() =>
              navigate(`/view.html?${setQueryStringParam("bg", "#111111")}`)
            }
          />
        }
      />
    </ButtonGroup>
  );
};