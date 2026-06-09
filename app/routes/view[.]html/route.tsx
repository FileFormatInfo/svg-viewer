/* eslint-disable no-console */
import React, { useCallback, useEffect, useRef } from "react";

import { useNavigate, useSearchParams } from "react-router";

import { t } from "~/utils/i18n";
import { safeParseFloat } from "~/utils/safeParseFloat";

import { DesktopToolbar } from "./DesktopToolbar";
import { MobileToolbar } from "./MobileToolbar";
import { calcMaxZoom, calcZoomIn, calcZoomOut } from "./calcZoom";
import { IconList } from "./IconList";
import { keyHandler } from "./KeyHandler";
import { useColorModeValue } from "~/components/ui/color-mode";
import { safeParseInt } from "~/utils/safeParseInt";

function logImageElement(img: HTMLImageElement | null) {
  if (img == null) {
    console.log("Image ref is null");
    return;
  }

  console.log(`img.naturalHeight=${img.naturalHeight}`);
  console.log(`img.naturalWidth=${img.naturalWidth}`);
  console.log(`img.complete=${img.complete}`);
  console.log(`img.crossOrigin=${img.crossOrigin}`);
  console.log(`img.currentSrc=${img.currentSrc}`);
  console.log(`img.src=${img.src}`);
}

export default function ViewPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const url = searchParams.get("url") || "";

  const [naturalWidth, setNaturalWidth] = React.useState(1);
  const [naturalHeight, setNaturalHeight] = React.useState(1);
  const [containerWidth, setContainerWidth] = React.useState(1);
  const [containerHeight, setContainerHeight] = React.useState(1);
  const [imageDisplay, setImageDisplay] = React.useState("none");
  const [loading, setLoading] = React.useState(true);
  const [loadErr, setLoadErr] = React.useState<object | null>(null);

  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const imageCss: Record<string, string> = {};

  const urlZoom = searchParams.get("zoom") || "1";
  let currentZoom = safeParseFloat(urlZoom, 1);
  if (urlZoom === "max") {
    currentZoom = calcMaxZoom(naturalWidth, naturalHeight, containerWidth, containerHeight);
  } else if (urlZoom === "icons") {
    // do nothing
  }

  imageCss.width = `${currentZoom * naturalWidth}px`;
  imageCss.height = `${currentZoom * naturalHeight}px`;

  let bg = searchParams.get("bg") || "memphis-mini";
  const defaultBorderBackgroundColor = useColorModeValue("#fff", "#111");
  const defaultBorderColor = useColorModeValue("#000", "#fff");
  const background: Record<string, string> = {};
  let borderColor: string;
  if (/^#[0-9A-Fa-f]{6}$/.test(bg)) {
    background.backgroundColor = bg;
    borderColor = getContrastYIQ(bg.slice(1));
  } else if (/^[-a-z]+$/.test(bg)) {
    background.backgroundImage = `url(/images/backgrounds/${bg}.png)`;
    background.backgroundColor = defaultBorderBackgroundColor;
    borderColor = defaultBorderColor;
  } else {
    background.backgroundColor = "#eeeeee";
    borderColor = "#000";
  }

  const border = searchParams.get("border") || "dash";
  let borderCss = "";
  if (border === "dash") {
    borderCss = `1px dashed ${borderColor}`;
  } else if (border === "thin") {
    borderCss = `1px solid ${borderColor}`;
  } else if (border === "thick") {
    borderCss = `4px solid ${borderColor}`;
  } else {
    borderCss = "none";
  }
  imageCss.outline = borderCss;

  const isDebug = (searchParams.get("debug") || "0") === "1";

  const onImageLoad = useCallback(() => {
    console.log("via onImageLoad");
    logImageElement(imageRef.current);

    setLoading(false);
    setNaturalWidth(imageRef.current?.naturalWidth || 1);
    setNaturalHeight(imageRef.current?.naturalHeight || 1);
    setImageDisplay("flex");
  }, []);

  const onSizeZero = useCallback(() => {
    console.log("via onSizeZero");
    logImageElement(imageRef.current);

    setNaturalWidth( safeParseInt(searchParams.get("width") || "64", 64) );
    setNaturalHeight( safeParseInt(searchParams.get("height") || "64", 64) );

    setLoading(false);
    setImageDisplay("flex");
  }, []);

  const onImageError = useCallback((err:any) => {
    console.log("via onImageError", err);
    logImageElement(imageRef.current);

    setLoading(false);
    setLoadErr({});
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setContainerWidth(rect.width);
      setContainerHeight(rect.height);
    }
  }, []);

/*
  useEffect(() => {
    console.log("via useEffect");
    if (imageRef.current?.complete) {
      if (imageRef.current?.naturalWidth === 0) {
        onSizeZero();
      } else {
        onImageLoad();
      }
    }
  }, [onImageError, onImageLoad, onSizeZero]);
*/
  useEffect(() => {
    function handleResize() {
      console.log(`resize: ${window?.innerWidth}x${window?.innerHeight}`);
    }
    window?.addEventListener("resize", handleResize);
    return () => {
      window?.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const sp = keyHandler(searchParams, bg, border, currentZoom, e);
      if (sp != null) {
        navigate(`?${sp.toString()}`);
      }
    }

    function handleWheel(e: WheelEvent) {
      const newZoom = e.deltaY < 0 ? calcZoomIn(currentZoom) : calcZoomOut(currentZoom);
      searchParams.set("zoom", newZoom.toString());
      navigate(`?${searchParams.toString()}`);
    }

    function handleTouch(e: TouchEvent) {
      console.log(e);
    }

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("wheel", handleWheel);
    document.addEventListener("touchend", handleTouch);

    return function cleanup() {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("wheel", handleWheel);
      document.removeEventListener("touchend", handleTouch);
    };
  }, [bg, border, currentZoom, navigate, searchParams]);

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden">
      <DesktopToolbar currentZoom={currentZoom} />
      <MobileToolbar currentZoom={currentZoom} />
      <div
        className="relative h-full w-full"
        ref={containerRef}
        style={{
          overflow: urlZoom == "icons" ? "scroll" : "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          ...background,
        }}
      >
        <img
          alt={`${url} (preload/debug)`}
          onError={(evt) => {
            onImageError(evt);
          }}
          onLoad={() => {
            console.log("via onLoad");
            if (imageRef.current?.naturalWidth === 0) {
              onSizeZero();
            } else {
              onImageLoad();
            }
          }}
          ref={imageRef}
          src={url}
          style={{
            opacity: isDebug ? 1 : 0,
            position: "absolute",
            top: 0,
            right: 0,
          }}
        />
        {loadErr != null ? (
          <div className="flex flex-col items-center gap-2">
            <img
              alt={t("Red stop sign")}
              src="/images/error.svg"
              style={{ width: "5rem", height: "5rem" }}
            />
            <p>{t("Error loading image")}</p>
            <a href={url}>{url}</a>
          </div>
        ) : null}
        {loading ? (
          <span className="loading loading-spinner loading-lg scriptonly" />
        ) : (
          urlZoom === "icons" ? (
            <IconList display={imageDisplay} imageCss={imageCss} url={url} />
          ) : (
            <img
              alt={url}
              src={url}
              style={{
                objectFit: "cover",
                overflow: "auto",
                display: imageDisplay,
                ...imageCss,
              }}
              title={url}
            />
          )
        )}
        {isDebug ? (
          <>
            <div style={{ position: "absolute", top: "0pt", left: "8px" }}>
              Window.inner: {globalThis.innerWidth}x{globalThis.innerHeight}
            </div>
            <div style={{ position: "absolute", top: "14pt", left: "8px" }}>
              Image natural size: {imageRef.current?.naturalWidth}x
              {imageRef.current?.naturalHeight}
            </div>
            <div style={{ position: "absolute", top: "28pt", left: "8px" }}>
              Image display size: {imageCss["width"]}x{imageCss["height"]}
            </div>
            <div style={{ position: "absolute", top: "42pt", left: "8px" }}>
              Zoom: cur={currentZoom}, url={urlZoom}, max=
              {calcMaxZoom(naturalWidth, naturalHeight, containerWidth, containerHeight)})
            </div>
            <div style={{ position: "absolute", top: "56pt", left: "8px" }}>
              Container boundingClientRect: {containerRef.current?.getBoundingClientRect().width}x
              {containerRef.current?.getBoundingClientRect().height}
            </div>
            <div style={{ position: "absolute", top: "70pt", left: "8px" }}>
              Container client: {containerRef.current?.clientWidth}x
              {containerRef.current?.clientHeight}
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}

// from https://24ways.org/2010/calculating-color-contrast/
function getContrastYIQ(hexcolor: string) {
  const r = parseInt(hexcolor.substring(0, 2), 16);
  const g = parseInt(hexcolor.substring(2, 4), 16);
  const b = parseInt(hexcolor.substring(4, 6), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? "black" : "white";
}
