import {
    PiSelectionSlashLight,
    PiSelectionLight,
    PiSquareBold,
    PiSquareLight,
} from "react-icons/pi";
import { useSearchParams } from "@remix-run/react";

import { ToolbarButton } from "~/components/ToolbarButton";
import { IconType } from "react-icons";

interface IProps {
    boxSize: string;
    size: 'xs' | 'sm' | 'md' | 'lg';
}

type BorderDefinition = {
    value: string;
    icon: IconType;
    label: string;
}

const borders: BorderDefinition[] = [
    { value: "none", icon: PiSelectionSlashLight, label: "No border" },
    { value: "dash", icon: PiSelectionLight, label: "Dash border" },
    { value: "thin", icon: PiSquareLight, label: "Thin border" },
    { value: "thick", icon: PiSquareBold, label: "Thick border" },
];

const BorderButtons = ({ size, boxSize }: IProps) => {
    const [searchParams] = useSearchParams();
    const currentBorder = searchParams.get("border") || "dash";

    return (
        <div className="join">
            {borders.map((border) => (
                <ToolbarButton
                    ariaLabel={border.label}
                    boxSize={boxSize}
                    icon={border.icon}
                    isActive={currentBorder === border.value}
                    key={border.value}
                    param="border"
                    size={size}
                    value={border.value}
                />))}
        </div>
    );
};

export {
    BorderButtons,
    borders
}
