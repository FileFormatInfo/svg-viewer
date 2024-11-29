import React from "react";
import { PiBug } from "react-icons/pi";

import {
    Group,
    Flex,
    Spacer,
    Text,
} from "@chakra-ui/react";
import { Link as RemixLink, useSearchParams } from "@remix-run/react";
import { useColorModeValue } from "~/components/ui/color-mode";


import { LogoIcon } from "~/components/LogoIcon";
import { ToggleModeButton } from "~/components/ToggleModeButton";
import { ToolbarButton } from "~/components/ToolbarButton";

import { BackgroundButtons } from "./BackgroundButtons";
import { BorderButtons } from "./BorderButtons";
import { ExitButton } from "./ExitButton";
import { ZoomButtons } from "./ZoomButtons";

interface IProps {
    currentZoom: number;
    setZoom?: React.Dispatch<React.SetStateAction<number>>;
}

export const DesktopToolbar = ({ currentZoom }: IProps) => {
    const borderColor = useColorModeValue("gray.200", "gray.900");
    const [searchParams] = useSearchParams();
    const backUrl = searchParams.get("backUrl") || "/";
    const backText = searchParams.get("backText") || "Exit";

    const urlDebug = searchParams.get("debug")
    const isDebug = (urlDebug || "0") === "1";

    return (
        <Flex
            w="100%"
            minW="100%"
            minH="60px"
            px={4}
            alignItems={"center"}
            borderBottom={1}
            direction="row"
            borderStyle="solid"
            borderColor={borderColor}
        >
                <RemixLink to="/">
            <Flex alignItems="center">
                <LogoIcon boxSize={10} />
                <Text fontSize="xl" fontWeight="bold" ps={3}>
                    SVG View
                </Text>
                </Flex>
                </RemixLink>
            <Spacer />
            <ZoomButtons currentZoom={currentZoom} boxSize="1.75em" size="md" />
            <Spacer />
            <BorderButtons boxSize="1.75em" size="md" />
            <Spacer />
            <BackgroundButtons boxSize="1.75em" size="md" />
            <Spacer />
            <Group gap="0.25">
                {urlDebug && <ToolbarButton
                    ariaLabel={"Show debug info"}
                    boxSize="1.75em"
                    className="scriptonly"
                    param="debug"
                    value={isDebug ? "0" : "1"}
                    icon={PiBug}
                    isActive={isDebug}
                    size="md"
                />}
                <ExitButton
                    text={backText}
                    boxSize="1.75em"
                    link={backUrl}
                    size="md"
                />
            </Group>
            <ToggleModeButton ms={2} />
        </Flex>
    );
};
