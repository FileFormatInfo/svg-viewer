import {
  PiArrowSquareOutBold,
  PiArrowsCounterClockwise,
  PiCheckerboardFill,
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

import { ButtonGroup, Icon, IconButton } from "@chakra-ui/react";
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

export const BorderButtons = ({ size, boxSize }: IProps) => {
    const navigate = useNavigate();

    const currentBorder = getQueryStringParam("border", "dash");

    return (<ButtonGroup isAttached>
        <IconButton
          aria-label="No border"
          size={size}
          title="No border"
          isActive={ currentBorder === "none" }
          icon={
            <Icon
              boxSize={boxSize}
              as={PiSelectionSlashLight}
              onClick={() =>
                navigate(`/view.html?${setQueryStringParam("border", "none")}`)
              }
            />
          }
        />
        <IconButton
          aria-label="Dash border"
          size={size}
          title="Dash border"
          isActive={ currentBorder === "dash" }
          icon={
            <Icon
              boxSize={boxSize}
              as={PiSelectionLight}
              onClick={() =>
                navigate(`/view.html?${setQueryStringParam("border", "dash")}`)
              }
            />
          }
        />
        <IconButton
          aria-label="Thin border"
          size={size}
          title="Thin border"
          isActive={ currentBorder === "thin" }
          icon={
            <Icon
              boxSize={boxSize}
              as={PiSquareLight}
              onClick={() =>
                navigate(`/view.html?${setQueryStringParam("border", "thin")}`)
              }
            />
          }
        />
        <IconButton
          aria-label="Thick border"
          size={size}
          title="Thick border"
          isActive={ currentBorder === "thick" }
          icon={
            <Icon
              boxSize={boxSize}
              as={PiSquareBold}
              onClick={() =>
                navigate(
                  `/view.html?${setQueryStringParam("border", "thick")}`
                )
              }
            />
          }
        />
      </ButtonGroup>)
};