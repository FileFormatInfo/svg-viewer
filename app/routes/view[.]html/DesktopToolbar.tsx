import React from "react";
import { PiBug } from "react-icons/pi";

import { Link as RemixLink, useSearchParams } from "react-router";

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
    const [searchParams] = useSearchParams();
    const backUrl = searchParams.get("backUrl") || "/";
    const backText = searchParams.get("backText") || "Exit";

    const urlDebug = searchParams.get("debug")
    const isDebug = (urlDebug || "0") === "1";

    return (
        <div className="hidden min-h-14 w-full items-center gap-4 border-b border-base-300 bg-base-100 px-4 lg:flex">
                <RemixLink to="/">
            <div className="flex items-center">
                <LogoIcon boxSize={40} />
                <span className="pl-3 text-xl font-bold">
                    SVG Viewer
                </span>
                </div>
                </RemixLink>
            <div className="flex-1" />
            <ZoomButtons currentZoom={currentZoom} boxSize="1.75em" size="md" />
            <div className="flex-1" />
            <BorderButtons boxSize="1.75em" size="md" />
            <div className="flex-1" />
            <BackgroundButtons boxSize="1.75em" size="md" />
            <div className="flex-1" />
            <div className="join gap-1">
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
            </div>
            <ToggleModeButton className="ml-2" />
        </div>
    );
};
