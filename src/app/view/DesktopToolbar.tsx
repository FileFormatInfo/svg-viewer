"use client";
import React from "react";
import { PiArrowSquareOutBold, PiBug } from "react-icons/pi";

import {
  ButtonGroup,
  Flex,
  Spacer,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useSearchParams } from "next/navigation";

import { setQueryStringParam } from "../utils/querystring";

import { LogoIcon } from "../components/LogoIcon";
import { ToggleModeButton } from "../components/ToggleModeButton";
import { ToolbarButton } from "../components/ToolbarButton";

import { Link as NextLink } from "@chakra-ui/next-js";

import { BackgroundButtons } from "./BackgroundButtons";
import { BorderButtons } from "./BorderButtons";
import { ZoomButtons } from "./ZoomButtons";

interface IProps {
  currentZoom: number;
  setZoom?: React.Dispatch<React.SetStateAction<number>>;
}

export const DesktopToolbar = ({ currentZoom, setZoom }: IProps) => {
  const searchParams = useSearchParams();
  const backUrl = searchParams.get("backUrl") || "/";
  const backText = searchParams.get("backText") || "Exit";

  const isDebug = (searchParams.get("debug") || "0") === "1";

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
      <Flex as={NextLink} href="/">
        <LogoIcon boxSize={10} />
        <Text fontSize="xl" fontWeight="bold" ps={3} pt={1}>
          SVG View
        </Text>
      </Flex>
      <Spacer />
      <ZoomButtons currentZoom={currentZoom} boxSize="1.75em" size="md" />
      <Spacer />
      <BorderButtons boxSize="1.75em" size="md" />
      <Spacer />
      <BackgroundButtons boxSize="1.75em" size="md" />
      <Spacer />
      <ButtonGroup gap="0.25">
        <ToolbarButton
          ariaLabel={"Show debug info"}
          boxSize="1.75em"
          href={`?${setQueryStringParam(searchParams,
            "debug",
            isDebug ? "0" : "1"
          )}`}
          icon={PiBug}
          isActive={isDebug}
          size="md"
        />
        <ToolbarButton
          ariaLabel={backText}
          boxSize="1.75em"
          href={backUrl}
          icon={PiArrowSquareOutBold}
          isActive={false}
          size="md"
        />
      </ButtonGroup>
      <ToggleModeButton ms={2} />
    </Flex>
  );
};
