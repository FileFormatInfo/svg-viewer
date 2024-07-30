import {
  PiSelectionSlashLight,
  PiSelectionLight,
  PiSquareBold,
  PiSquareLight,
} from "react-icons/pi";
import { useSearchParams } from "@remix-run/react";

import { ButtonGroup } from "@chakra-ui/react";


import { ToolbarButton } from "~/components/ToolbarButton";

interface IProps {
  boxSize: string;
  size: string;
}

export const BorderButtons = ({ size, boxSize }: IProps) => {
  const [searchParams] = useSearchParams();
  const currentBorder = searchParams.get("border") || "dash";

  return (
    <ButtonGroup isAttached>
      <ToolbarButton
        ariaLabel="No border"
        boxSize={boxSize}
        param="border"
        value="none"
        icon={PiSelectionSlashLight}
        isActive={currentBorder === "none"}
        size={size}
      />
      <ToolbarButton
        ariaLabel="Dash border"
        boxSize={boxSize}
        param="border"
        value="dash"
        icon={PiSelectionLight}
        isActive={currentBorder === "dash"}
        size={size}
      />
      <ToolbarButton
        ariaLabel="Thin border"
        boxSize={boxSize}
        param="border"
        value="thin"
        icon={PiSquareLight}
        isActive={currentBorder === "thin"}
        size={size}
      />
      <ToolbarButton
        ariaLabel="Thick border"
        boxSize={boxSize}
        param="border"
        value="thick"
        icon={PiSquareBold}
        isActive={currentBorder === "thick"}
        size={size}
      />
    </ButtonGroup>
  );
};
