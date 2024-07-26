"use client";
import {
  PiCheckerboardFill,
  PiSquare,
  PiSquareFill,
  PiScribbleBold,
} from "react-icons/pi";

import { ButtonGroup, useColorModeValue } from "@chakra-ui/react";

import { t } from "../utils/i18n";
import { setQueryStringParam } from "../utils/querystring";

import { ToolbarButton } from "../components/ToolbarButton";
import { useSearchParams } from "next/navigation";

interface IProps {
  boxSize: string;
  size: string;
}

export const BackgroundButtons = ({ size, boxSize }: IProps) => {
  const searchParams = useSearchParams();
  const currentBg = searchParams.get("bg") || "memphis-mini";

  return (
    <ButtonGroup isAttached>
      <ToolbarButton
        ariaLabel={t("Squiggles background")}
        size={size}
        href={`/view.html?${setQueryStringParam(
          searchParams,
          "bg",
          "memphis-mini"
        )}`}
        isActive={currentBg === "memphis-mini"}
        icon={PiScribbleBold}
        boxSize={boxSize}
      />
      <ToolbarButton
        ariaLabel="Checkboard background"
        boxSize={boxSize}
        href={`/view.html?${setQueryStringParam(
          searchParams,
          "bg",
          "checkerboard"
        )}`}
        isActive={currentBg === "checkerboard"}
        size={size}
        icon={PiCheckerboardFill}
      />
      <ToolbarButton
        ariaLabel="Light background"
        boxSize={boxSize}
        href={`/view.html?${setQueryStringParam(
          searchParams,
          "bg",
          "#eeeeee"
        )}`}
        isActive={currentBg === "#eeeeee"}
        size={size}
        icon={useColorModeValue(PiSquare, PiSquareFill)}
      />
      <ToolbarButton
        ariaLabel="Dark background"
        boxSize={boxSize}
        href={`/view.html?${setQueryStringParam(
          searchParams,
          "bg",
          "#111111"
        )}`}
        isActive={currentBg === "#111111"}
        size={size}
        icon={useColorModeValue(PiSquareFill, PiSquare)}
      />
    </ButtonGroup>
  );
};
