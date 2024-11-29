import React from "react";
import {
  PiArrowsCounterClockwiseBold,
  PiMagnifyingGlassMinusBold,
  PiMagnifyingGlassPlusBold,
  PiArrowsOutCardinalBold,
} from "react-icons/pi";
import { Link as RemixLink, useSearchParams } from "@remix-run/react";

import { Group, Icon, IconButton } from "@chakra-ui/react";

import { ToolbarButton } from "~/components/ToolbarButton";
import { IconTool } from "~/components/IconTool";
import { calcZoomIn, calcZoomOut } from "./calcZoom";
import { LuVoicemail } from "react-icons/lu";

interface IProps {
  currentZoom: number;
  setZoom?: React.Dispatch<React.SetStateAction<number>>;
  boxSize: string;
    size: 'xs' | 'sm' | 'md' | 'lg';
}

export const ZoomButtons = ({ currentZoom, size, boxSize }: IProps) => {
  const [searchParams] = useSearchParams();

  return (
      <Group attached>
          <IconButton variant="outline"><LuVoicemail /></IconButton>
          <IconButton aria-label="x" title="y" variant="outline"><RemixLink to="/"><Icon fontSize="3xl"><PiMagnifyingGlassMinusBold /></Icon></RemixLink></IconButton>
          <IconButton
              aria-label={"x"}
              title={"title"}
              variant="outline"
          >
              <RemixLink to={`x`}>
                  <Icon fontSize="3xl">
                      <PiArrowsCounterClockwiseBold />
                  </Icon>
              </RemixLink>
          </IconButton>
    <ToolbarButton
        ariaLabel="Zoom out"
        boxSize={boxSize}
        param="zoom"
        value={String(calcZoomOut(currentZoom))}
        isActive={false}
        size={size}
        icon={PiMagnifyingGlassMinusBold}
      />
          <IconButton variant="outline"><RemixLink to="/"><Icon fontSize="4xl"><LuVoicemail /></Icon></RemixLink></IconButton>
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
        value={String(calcZoomIn(currentZoom ))}
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
        icon={IconTool}
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
      </Group>
  );
};
