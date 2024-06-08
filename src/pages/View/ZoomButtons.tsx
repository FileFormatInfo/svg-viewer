import React from "react";
import {
  PiArrowSquareOutBold,
  PiArrowsCounterClockwiseBold, PiCheckerboardFill,
  PiSelectionSlashLight,
  PiSelectionLight,
  PiSquare,
  PiSquareBold,
  PiSquareFill,
  PiSquareLight,
  PiScribbleBold,
  PiMagnifyingGlassMinusBold,
  PiMagnifyingGlassPlusBold,
  PiArrowsOutCardinalBold,
  PiArrowsInCardinalBold,
  PiBug,
} from "react-icons/pi";



import { ButtonGroup, Button, Flex, Icon, IconButton, Spacer, Text, useColorModeValue } from "@chakra-ui/react";
import { useBrandColor } from "theme";



import { getQueryStringParam, setQueryStringParam } from "utils/querystring";
import { safeParseFloat } from "utils/safeParseFloat";



import { LogoIcon } from "shared/Components";
import { ToggleModeButton } from "shared/Components";
import { Link, useNavigate, useSearchParams } from "shared/Router";



import { BackgroundButtons } from "./BackgroundButtons";
import { BorderButtons } from "./BorderButtons";


interface IProps {
  boxSize: string;
  size: string;
}

export const ZoomButtons = ({ size, boxSize }: IProps) => {
  const navigate = useNavigate();

  return (
    <ButtonGroup isAttached>
      <IconButton
        aria-label="Zoom out"
        size={size}
        title="Zoom out"
        icon={<Icon boxSize={boxSize} as={PiMagnifyingGlassMinusBold} />}
        onClick={() => {
          const currentZoom = safeParseFloat(
            getQueryStringParam("zoom", "1"),
            1
          );
          let newZoom = currentZoom > 1 ? currentZoom - 1 : currentZoom * 0.5;
          if (newZoom < 0.01) {
            newZoom = 0.01;
          }
          navigate(
            `/view.html?${setQueryStringParam("zoom", String(newZoom))}`
          );
        }}
      />
      <IconButton
        aria-label="Original size"
        size={size}
        title="Original size"
        icon={<Icon boxSize={boxSize} as={PiArrowsCounterClockwiseBold} />}
        onClick={() =>
          navigate(`/view.html?${setQueryStringParam("zoom", "1")}`)
        }
      />
      <IconButton
        aria-label="Zoom In"
        size={size}
        title="Zoom In"
        icon={<Icon boxSize={boxSize} as={PiMagnifyingGlassPlusBold} />}
        onClick={() => {
          const currentZoom = safeParseFloat(
            getQueryStringParam("zoom", "1"),
            1
          );
          navigate(
            `/view.html?${setQueryStringParam("zoom", String(currentZoom + 1))}`
          );
        }}
      />
      <IconButton
        aria-label="Max zoom"
        size={size}
        title="Max zoom"
        icon={<Icon boxSize={boxSize} as={PiArrowsOutCardinalBold} />}
        onClick={() =>
          navigate(`/view.html?${setQueryStringParam("zoom", "max")}`)
        }
      />
    </ButtonGroup>
  );
};