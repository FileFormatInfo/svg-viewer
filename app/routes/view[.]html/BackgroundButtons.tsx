import { useMemo } from 'react';
import { useSearchParams } from '@remix-run/react';
import { ToolbarButton } from '~/components/ToolbarButton';

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
    const defaultCustom = isCustom && /^#[0-9A-Fa-f]{6}$/.test(currentBg) ? currentBg : "#0000ff";
    const customColor = useMemo(() => defaultCustom, [defaultCustom]);

    const onCustomColorChange = (value: string) => {
        const nextSearchParams = new URLSearchParams(searchParams);
        nextSearchParams.set("bg", value);
        setSearchParams(nextSearchParams);
    };

    return (
        <div className="join">
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
            <label className="join-item btn btn-outline btn-square p-1 scriptonly" title="Custom background color">
                <input
                    type="color"
                    value={customColor}
                    onChange={(e) => onCustomColorChange(e.target.value)}
                    className="h-6 w-6 cursor-pointer border-0 bg-transparent p-0"
                    aria-label="Custom background color"
                />
            </label>
        </div>
    );
};

export {
    backgrounds,
    BackgroundButtons
}
