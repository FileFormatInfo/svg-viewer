"use client";
import {
  PiSelectionSlashLight,
  PiSelectionLight,
  PiSquareBold,
  PiSquareLight,
} from "react-icons/pi";
import { useSearchParams } from "next/navigation";

import { ButtonGroup } from "@chakra-ui/react";

import { setQueryStringParam } from "../utils/querystring";

import { ToolbarButton } from "../components/ToolbarButton";

interface IProps {
  boxSize: string;
  size: string;
}

export const BorderButtons = ({ size, boxSize }: IProps) => {
  const searchParams = useSearchParams();
  const currentBorder = searchParams.get("border") || "dash";

  return (
    <ButtonGroup isAttached>
      <ToolbarButton
        ariaLabel="No border"
        boxSize={boxSize}
        href={`?${setQueryStringParam(
          searchParams,
          "border",
          "none"
        )}`}
        icon={PiSelectionSlashLight}
        isActive={currentBorder === "none"}
        size={size}
      />
      <ToolbarButton
        ariaLabel="Dash border"
        boxSize={boxSize}
        href={`?${setQueryStringParam(
          searchParams,
          "border",
          "dash"
        )}`}
        icon={PiSelectionLight}
        isActive={currentBorder === "dash"}
        size={size}
      />
      <ToolbarButton
        ariaLabel="Thin border"
        boxSize={boxSize}
        href={`?${setQueryStringParam(
          searchParams,
          "border",
          "thin"
        )}`}
        icon={PiSquareLight}
        isActive={currentBorder === "thin"}
        size={size}
      />
      <ToolbarButton
        ariaLabel="Thick border"
        boxSize={boxSize}
        href={`?${setQueryStringParam(
          searchParams,
          "border",
          "thick"
        )}`}
        icon={PiSquareBold}
        isActive={currentBorder === "thick"}
        size={size}
      />
    </ButtonGroup>
  );
};
