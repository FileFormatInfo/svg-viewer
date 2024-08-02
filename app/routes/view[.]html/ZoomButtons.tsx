import React from "react";
import {
  PiArrowsCounterClockwiseBold,
  PiMagnifyingGlassMinusBold,
  PiMagnifyingGlassPlusBold,
  PiArrowsOutCardinalBold,
  PiChartBarFill,
} from "react-icons/pi";
import { useSearchParams } from "@remix-run/react";

import { ButtonGroup } from "@chakra-ui/react";

import { ToolbarButton } from "~/components/ToolbarButton";

interface IProps {
  currentZoom: number;
  setZoom?: React.Dispatch<React.SetStateAction<number>>;
  boxSize: string;
  size: string;
}

export const ZoomButtons = ({ currentZoom, size, boxSize }: IProps) => {
  const [searchParams] = useSearchParams();
  let zoomOut = currentZoom > 1 ? currentZoom - 1 : currentZoom * 0.5;
  if (zoomOut < 0.01) {
    zoomOut = 0.01;
  }
  return (
    <ButtonGroup isAttached>
      <ToolbarButton
        ariaLabel="Zoom out"
        boxSize={boxSize}
        param="zoom"
        value={String(zoomOut)}
        isActive={false}
        size={size}
        icon={PiMagnifyingGlassMinusBold}
      />
      <ToolbarButton
        ariaLabel="Original size"
        size={size}
        boxSize={boxSize}
        param="zoom"
        value="1"
        isActive={(searchParams.get("zoom") || "1") === "1"}
        icon={PiArrowsCounterClockwiseBold}
      />
      <ToolbarButton
        ariaLabel="Zoom In"
        boxSize={boxSize}
        param="zoom"
        value={String(currentZoom + 1)}
        size={size}
        icon={PiMagnifyingGlassPlusBold}
        isActive={false}
      />
      <ToolbarButton
        ariaLabel="Icons"
        boxSize={boxSize}
        param="zoom"
        value="icons"
        size={size}
        icon={PiChartBarFill}
        isActive={searchParams.get("zoom") === "icons"}
      />
      <ToolbarButton
        ariaLabel="Max zoom"
        boxSize={boxSize}
        param="zoom"
        value="max"
        isActive={searchParams.get("zoom") === "max"}
        size={size}
        icon={PiArrowsOutCardinalBold}
      />
    </ButtonGroup>
  );
};
