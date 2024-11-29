import {
    PiCheckerboardFill,
    PiSquare,
    PiSquareFill,
    PiScribbleBold,
} from "react-icons/pi";

import { Group } from "@chakra-ui/react";
import { useColorModeValue } from "~/components/ui/color-mode";

import { ToolbarButton } from "~/components/ToolbarButton";
import { useSearchParams } from "@remix-run/react";
import { IconType } from "react-icons";

interface IProps {
    boxSize: string;
    size: 'xs' | 'sm' | 'md' | 'lg';
}

type BackgroundDefinition = {
    value: string;
    iconDark: IconType;
    iconLight: IconType;
    label: string;
}

const backgrounds: BackgroundDefinition[] = [
    { value: "memphis-mini", iconDark: PiScribbleBold, iconLight: PiScribbleBold, label: "Squiggles background" },
    { value: "checkerboard", iconDark: PiCheckerboardFill, iconLight: PiCheckerboardFill, label: "Checkboard background" },
    { value: "#eeeeee", iconDark: PiSquareFill, iconLight: PiSquare, label: "Light background" },
    { value: "#111111", iconDark: PiSquare, iconLight: PiSquareFill, label: "Dark background" },
];


const BackgroundButtons = ({ size, boxSize }: IProps) => {
    const [searchParams] = useSearchParams();
    const currentBg = searchParams.get("bg") || "memphis-mini";
    const isDark = useColorModeValue(true, false);

    return (
        <Group attached>
            {backgrounds.map((background) => (
                <ToolbarButton
                    ariaLabel={background.label}
                    boxSize={boxSize}
                    icon={isDark ? background.iconLight : background.iconDark}
                    isActive={currentBg === background.value}
                    key={background.value}
                    param="bg"
                    size={size}
                    value={background.value}
                />
            ))}
        </Group>
    );
};

export {
    backgrounds,
    BackgroundButtons
}
