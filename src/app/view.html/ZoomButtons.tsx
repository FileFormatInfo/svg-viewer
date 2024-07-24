"use client";
import React from "react";
import {
  PiArrowsCounterClockwiseBold,
  PiMagnifyingGlassMinusBold,
  PiMagnifyingGlassPlusBold,
  PiArrowsOutCardinalBold,
} from "react-icons/pi";
import { useSearchParams } from "next/navigation";

import { ButtonGroup } from "@chakra-ui/react";

import { setQueryStringParam } from "../utils/querystring";

import { ToolbarButton } from "../components/ToolbarButton";

interface IProps {
  currentZoom: number;
  setZoom?: React.Dispatch<React.SetStateAction<number>>;
  boxSize: string;
  size: string;
}

export const ZoomButtons = ({ currentZoom, size, boxSize }: IProps) => {
  const searchParams = useSearchParams();
  let zoomOut = currentZoom > 1 ? currentZoom - 1 : currentZoom * 0.5;
  if (zoomOut < 0.01) {
    zoomOut = 0.01;
  }
  return (
    <ButtonGroup isAttached>
      <ToolbarButton
        ariaLabel="Zoom out"
        boxSize={boxSize}
        href={`/view.html?${setQueryStringParam(
          searchParams,
          "zoom",
          String(zoomOut)
        )}`}
        isActive={false}
        size={size}
        icon={PiMagnifyingGlassMinusBold}
      />
      <ToolbarButton
        ariaLabel="Original size"
        size={size}
        boxSize={boxSize}
        href={`/view.html?${setQueryStringParam(searchParams, "zoom", "1")}`}
        isActive={currentZoom === 1}
        icon={PiArrowsCounterClockwiseBold}
      />
      <ToolbarButton
        ariaLabel="Zoom In"
        boxSize={boxSize}
        href={`/view.html?${setQueryStringParam(
          searchParams,
          "zoom",
          String(currentZoom + 1)
        )}`}
        size={size}
        icon={PiMagnifyingGlassPlusBold}
        isActive={false}
      />
      <ToolbarButton
        ariaLabel="Max zoom"
        boxSize={boxSize}
        href={`/view.html?${setQueryStringParam(searchParams, "zoom", "max")}`}
        isActive={searchParams.get("zoom") === "max"}
        size={size}
        icon={PiArrowsOutCardinalBold}
      />
    </ButtonGroup>
  );
};
