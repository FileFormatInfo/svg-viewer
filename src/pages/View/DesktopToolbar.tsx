import React from "react";
import { PiArrowSquareOutBold, PiCheckerboardFill, PiSelectionSlashLight, PiSelectionLight, PiSquare, PiSquareBold, PiSquareFill, PiSquareLight, PiScribbleBold, PiMagnifyingGlassMinusBold, PiMagnifyingGlassPlusBold, PiArrowsOutCardinalBold, PiArrowsInCardinalBold, PiBug } from "react-icons/pi";



import {
  ButtonGroup,
  Button,
  Flex,
  Icon,
  IconButton,
  Spacer,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useBrandColor } from "theme";



import { getQueryStringParam, setQueryStringParam } from "utils/querystring";
import { safeParseFloat } from "utils/safeParseFloat";



import { LogoIcon } from "shared/Components";
import { ToggleModeButton } from "shared/Components";
import { Link, useNavigate, useSearchParams } from "shared/Router";

import { BackgroundButtons } from "./BackgroundButtons";
import { BorderButtons } from "./BorderButtons";
import { ZoomButtons } from "./ZoomButtons";


export const DesktopToolbar = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const linkColor = useColorModeValue("gray.600", "gray.200");
  const popoverContentBgColor = useColorModeValue("white", "gray.800");
  const brandColor = useBrandColor();
  const bg = useColorModeValue("gray.50", "gray.900");

  const backUrl = searchParams.get("backUrl") || "/";
  const backText = searchParams.get("backText") || "Exit";

  const isDebug = getQueryStringParam("debug", "0") === "1";

  return (
    <Flex
      w="100%"
      minW="100%"
      minH="60px"
      py={2}
      px={4}
      borderBottom={1}
      direction="row"
      borderStyle="solid"
      borderColor={useColorModeValue("gray.200", "gray.900")}
    >
      <Flex onClick={() => navigate("/open.html")}>
        <LogoIcon boxSize={10} />
        <Text fontSize="xl" fontWeight="bold" ps={3} pt={1}>
          SVG View
        </Text>
      </Flex>
      <Spacer />
      <ZoomButtons boxSize="1.75em" size="md" />
      <Spacer />
      <BorderButtons boxSize="1.75em" size="md" />
      <Spacer />
      <BackgroundButtons boxSize="1.75em" size="md" />
      <Spacer />
      <IconButton
        aria-label={"Show debug info"}
        icon={<Icon boxSize="1.75em" as={PiBug} />}
        isActive={isDebug}
        onClick={ () => navigate(`/view.html?${setQueryStringParam("debug", isDebug ? "0" : "1")}`)}
        title={"Show debug info"}
      />
      <IconButton
        aria-label={backText}
        icon={<Icon boxSize="1.75em" as={PiArrowSquareOutBold} />}
        ms={2}
        onClick={() => {
          if (backUrl.startsWith("http://") || backUrl.startsWith("https://")) {
            window.location.href = backUrl;
          } else {
            navigate(backUrl)
          }
        }}
        title={backText}
      />
      <ToggleModeButton ms={2} />
    </Flex>
  );
};

