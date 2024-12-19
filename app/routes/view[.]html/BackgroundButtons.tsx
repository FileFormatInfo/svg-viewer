import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Group, parseColor } from '@chakra-ui/react';
import { ToolbarButton } from '~/components/ToolbarButton';
import {
    ColorPickerRoot,
    ColorPickerControl,
    ColorPickerTrigger,
    ColorPickerContent,
    ColorPickerArea,
    ColorPickerChannelSlider
} from '~/components/ui/color-picker';

import {
    PiCheckerboardFill,
    PiSquare,
    PiSquareFill,
    PiScribbleBold,
} from "react-icons/pi";

import { IconType } from "react-icons";
import { useColorModeValue } from '~/components/ui/color-mode';

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

const darkBg = "#111111";
const lightBg = "#eeeeee";

const backgrounds: BackgroundDefinition[] = [
    { value: "memphis-mini", iconDark: PiScribbleBold, iconLight: PiScribbleBold, label: "Squiggles background" },
    { value: "checkerboard", iconDark: PiCheckerboardFill, iconLight: PiCheckerboardFill, label: "Checkboard background" },
    { value: lightBg, iconDark: PiSquareFill, iconLight: PiSquare, label: "Light background" },
    { value: darkBg, iconDark: PiSquare, iconLight: PiSquareFill, label: "Dark background" },
];

const BackgroundButtons = ({ size, boxSize }: IProps) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const currentBg = searchParams.get("bg") || "memphis-mini";
    const isDark = useColorModeValue(true, false);
    const isCustom = !backgrounds.some((bg) => bg.value === currentBg);
    const defaultCustom = isCustom ? currentBg : "#0000ff";
    const [colorValue, setColorValue] = useState(parseColor(defaultCustom));

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
            <ColorPickerRoot
                className="scriptonly"
                defaultValue={parseColor(defaultCustom)}
                maxW="200px"
                onExitComplete={() => { console.log(`exit ${JSON.stringify(colorValue)}`); }}
                onOpenChange={(e) => { console.log(`open change: ${JSON.stringify(e)}`, this); }}
                onValueChange={(e) => {
                    setColorValue(e.value);
                    console.log(`event: ${JSON.stringify(e)}`);
                    console.log(`color value: ${e.value.toString('hex')}`);
                    searchParams.set("bg", e.value.toString('hex'));
                    setSearchParams(searchParams);
                }}
            >
                <ColorPickerControl>
                    <ColorPickerTrigger />
                </ColorPickerControl>
                <ColorPickerContent>
                    <ColorPickerArea />
                    <ColorPickerChannelSlider channel="hue" />
                </ColorPickerContent>
            </ColorPickerRoot>
        </Group>
    );
};

export {
    backgrounds,
    BackgroundButtons
}
