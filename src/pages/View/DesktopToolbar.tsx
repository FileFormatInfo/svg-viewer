import {
  PiArrowSquareOutBold,
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
} from "react-icons/pi";

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

export const DesktopToolbar = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const linkColor = useColorModeValue("gray.600", "gray.200");
  const popoverContentBgColor = useColorModeValue("white", "gray.800");
  const brandColor = useBrandColor();
  const bg = useColorModeValue("gray.50", "gray.900");

  const backUrl = searchParams.get("backUrl") || "/";
  const backText = searchParams.get("backText") || "Exit";

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
      <ButtonGroup isAttached>
        <IconButton
          aria-label="Zoom out"
          title="Zoom out"
          icon={<Icon boxSize="1.75em" as={PiMagnifyingGlassMinusBold} />}
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
          title="Original size"
          icon={<Icon boxSize="1.75em" as={PiArrowsInCardinalBold} />}
          onClick={() =>
            navigate(`/view.html?${setQueryStringParam("zoom", "1")}`)
          }
        />
        <IconButton
          aria-label="Zoom In"
          title="Zoom In"
          icon={<Icon boxSize="1.75em" as={PiMagnifyingGlassPlusBold} />}
          onClick={() => {
            const currentZoom = safeParseFloat(
              getQueryStringParam("zoom", "1"),
              1
            );
            navigate(
              `/view.html?${setQueryStringParam(
                "zoom",
                String(currentZoom + 1)
              )}`
            );
          }}
        />
        <IconButton
          aria-label="Max zoom"
          title="Max zoom"
          icon={<Icon boxSize="1.75em" as={PiArrowsOutCardinalBold} />}
          onClick={() =>
            navigate(`/view.html?${setQueryStringParam("zoom", "max")}`)
          }
        />
      </ButtonGroup>
      <Spacer />
      <ButtonGroup isAttached>
        <IconButton
          aria-label="No border"
          title="No border"
          isActive={ getQueryStringParam("border", "dash") === "none" }
          icon={
            <Icon
              boxSize="1.75em"
              as={PiSelectionSlashLight}
              onClick={() =>
                navigate(`/view.html?${setQueryStringParam("border", "none")}`)
              }
            />
          }
        />
        <IconButton
          aria-label="Dash border"
          title="Dash border"
          isActive={ getQueryStringParam("border", "dash") === "dash" }
          icon={
            <Icon
              boxSize="1.75em"
              as={PiSelectionLight}
              onClick={() =>
                navigate(`/view.html?${setQueryStringParam("border", "dash")}`)
              }
            />
          }
        />
        <IconButton
          aria-label="Thin border"
          title="Thin border"
          isActive={ getQueryStringParam("border", "dash") === "thin" }
          icon={
            <Icon
              boxSize="1.75em"
              as={PiSquareLight}
              onClick={() =>
                navigate(`/view.html?${setQueryStringParam("border", "thin")}`)
              }
            />
          }
        />
        <IconButton
          aria-label="Thick border"
          title="Thick border"
          isActive={ getQueryStringParam("border", "dash") === "thick" }
          icon={
            <Icon
              boxSize="1.75em"
              as={PiSquareBold}
              onClick={() =>
                navigate(
                  `/view.html?${setQueryStringParam("border", "thick")}`
                )
              }
            />
          }
        />
      </ButtonGroup>
      <Spacer />
      <ButtonGroup isAttached>
        <IconButton
          aria-label="Squiggles background"
          title="Squiggles background"
          isActive={ getQueryStringParam("bg", "memphis-mini") === "memphis-mini" }
          icon={
            <Icon
              boxSize="1.75em"
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
          title="Checkboard background"
          isActive={ getQueryStringParam("bg", "memphis-mini") === "checkerboard" }
          icon={
            <Icon
              boxSize="1.75em"
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
          title="Light background"
          isActive={ getQueryStringParam("bg", "memphis-mini") === "#eeeeee" }
          icon={
            <Icon
              boxSize="1.75em"
              as={PiSquare}
              onClick={() =>
                navigate(`/view.html?${setQueryStringParam("bg", "#eeeeee")}`)
              }
            />
          }
        />
        <IconButton
          aria-label="Dark background"
          title="Dark background"
          isActive={ getQueryStringParam("bg", "memphis-mini") === "#111111" }
          icon={
            <Icon
              boxSize="1.75em"
              as={PiSquareFill}
              onClick={() =>
                navigate(`/view.html?${setQueryStringParam("bg", "#111111")}`)
              }
            />
          }
        />
      </ButtonGroup>
      <Spacer />
      <IconButton
        aria-label={backText}
        icon={<Icon boxSize="1.75em" as={PiArrowSquareOutBold} />}
        onClick={() => {
          if (backUrl.startsWith("http://") || backUrl.startsWith("https://")) {
            window.location.href = backUrl;
          } else {
            navigate(backUrl)
          }
        }}
      />
      <ToggleModeButton ms={2} />
    </Flex>
  );
};
