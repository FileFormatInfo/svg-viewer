import React, { useState } from "react";
import { PiBug, PiListBold, PiXBold } from "react-icons/pi";
import { Link as RemixLink, useSearchParams } from "@remix-run/react";

import { LogoIcon } from "~/components/LogoIcon";
import { ToggleModeButton } from "~/components/ToggleModeButton";
import { ToolbarButton } from "~/components/ToolbarButton";
import { t } from "~/utils/i18n";

import { BackgroundButtons } from "./BackgroundButtons";
import { BorderButtons } from "./BorderButtons";
import { ExitButton } from "./ExitButton";
import { ZoomButtons } from "./ZoomButtons";

interface IProps {
  currentZoom: number;
  setZoom?: React.Dispatch<React.SetStateAction<number>>;
}

export const MobileToolbar = ({ currentZoom, setZoom }: IProps) => {
  void setZoom;

  const [searchParams] = useSearchParams();
  const [open, setOpen] = useState(false);

  const urlDebug = searchParams.get("debug");
  const isDebug = (urlDebug || "0") === "1";
  const backUrl = searchParams.get("backUrl") || "/";
  const backText = searchParams.get("backText") || t("Exit");

  return (
    <>
      <div className="flex min-h-14 w-full items-center gap-2 border-b border-base-300 bg-base-100 px-3 py-2 lg:hidden">
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="btn btn-outline btn-square"
          aria-label="Open menu"
          title="Open menu"
        >
          {open ? <PiXBold className="text-xl" /> : <PiListBold className="text-xl" />}
        </button>

        <RemixLink to="/" className="flex flex-1 items-center gap-2 no-underline">
          <LogoIcon boxSize={32} />
          <span className="text-lg font-bold">SVG View</span>
        </RemixLink>

        <ExitButton link={backUrl} text={backText} />
      </div>

      {open ? (
        <div className="space-y-3 border-b border-base-300 bg-base-100 px-3 py-3 lg:hidden">
          <div className="flex items-center justify-between gap-2">
            <span className="text-sm font-semibold">Zoom</span>
            <ZoomButtons boxSize="2.25em" currentZoom={currentZoom} setZoom={setZoom} size="sm" />
          </div>

          <div className="flex items-center justify-between gap-2">
            <span className="text-sm font-semibold">Border</span>
            <BorderButtons boxSize="2.25em" size="sm" />
          </div>

          <div className="flex items-center justify-between gap-2">
            <span className="text-sm font-semibold">Background</span>
            <BackgroundButtons boxSize="2.25em" size="sm" />
          </div>

          <div className="flex items-center justify-between gap-2">
            <span className="text-sm font-semibold">Debugging?</span>
            {urlDebug ? (
              <ToolbarButton
                ariaLabel={"Show debug info"}
                boxSize="2.25em"
                className="scriptonly"
                param="debug"
                value={isDebug ? "0" : "1"}
                icon={PiBug}
                isActive={isDebug}
                size="sm"
              />
            ) : (
              <span className="badge">N/A</span>
            )}
          </div>

          <div className="flex justify-end">
            <ToggleModeButton />
          </div>
        </div>
      ) : null}
    </>
  );
};
