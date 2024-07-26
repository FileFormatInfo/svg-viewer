"use client";
/* eslint-disable no-console */
import React, { useCallback, useEffect, useRef } from "react";

import {
  VStack,
  Flex,
  Spinner,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import { useSearchParams } from "next/navigation";

import { t } from "../utils/i18n";
import { safeParseFloat } from "../utils/safeParseFloat";

import { DesktopToolbar } from "./DesktopToolbar";
import { MobileToolbar } from "./MobileToolbar";
import { calcMaxZoom } from "./calcMaxZoom";

export default function ViewPage() {
  const searchParams = useSearchParams();
  const url = searchParams.get("url") || undefined;

  const [naturalWidth, setNaturalWidth] = React.useState(1);
  const [naturalHeight, setNaturalHeight] = React.useState(1);
  const [imageDisplay, setImageDisplay] = React.useState( 'none' );
  const [loading, setLoading] = React.useState(true);
  const [loadErr, setLoadErr] = React.useState<Object | null>(null);

  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  //const imageSize = useSize(imageRef);
  //const containerSize = useSize(containerRef);
  const imageCss: Record<string, string> = {};

  const urlZoom = searchParams.get("zoom") || "1";
  let currentZoom = safeParseFloat(urlZoom, 1);
  if (urlZoom === "max") {
    currentZoom = calcMaxZoom(naturalWidth, naturalHeight, containerRef);
  }

  imageCss["width"] = `${currentZoom * naturalWidth}px`;
  imageCss["height"] = `${currentZoom * naturalHeight}px`;

  const bg = searchParams.get("bg") || "memphis-mini";
  const defaultBorderBackgroundColor = useColorModeValue("#fff", "#111");
  const defaultBorderColor = useColorModeValue("#000", "#fff");
  const background: Record<string, string> = {};
  let borderColor: String;
  if (/^#[0-9A-Fa-f]{6}$/.test(bg)) {
    background["backgroundColor"] = bg;
    borderColor = getContrastYIQ(bg.slice(1));
  } else if (/^[-a-z]+$/.test(bg)) {
    background["backgroundImage"] = `url(/images/backgrounds/${bg}.png)`;
    background["backgroundColor"] = defaultBorderBackgroundColor;
    borderColor = defaultBorderColor;
  } else {
    background["backgroundColor"] = "#eeeeee";
    borderColor = "#000";
  }

  const border = searchParams.get("border") || "dash";
  if (border === "dash") {
    imageCss["outline"] = `1px dashed ${borderColor}`;
  } else if (border === "thin") {
    imageCss["outline"] = `1px solid ${borderColor}`;
  } else if (border === "thick") {
    imageCss["outline"] = `4px solid ${borderColor}`;
  } else {
    imageCss["outline"] = "none";
  }

  const isDebug = (searchParams.get("debug") || "0") === "1";

  const toolbar = useBreakpointValue({
    base: <MobileToolbar currentZoom={currentZoom} />,
    lg: <DesktopToolbar currentZoom={currentZoom} />,
  }) || <DesktopToolbar currentZoom={currentZoom} />;

  const onImageLoad = useCallback(() => {
    console.log(
      `onload: ${imageRef.current?.naturalWidth}, ${imageRef.current?.naturalHeight}`
    );
    setLoading(false);
    setNaturalWidth(imageRef.current?.naturalWidth || 1);
    setNaturalHeight(imageRef.current?.naturalHeight || 1);
    setImageDisplay( 'block' );
  }, [ imageRef ]);

  const onImageError = useCallback(() => {
    console.log(`onerror`);
    setLoading(false);
    setLoadErr({});
  }, []);

  useEffect(() => {
    if (imageRef.current?.complete) {
      if (imageRef.current?.naturalWidth === 0) {
        onImageError();
      } else {
        onImageLoad();
      }
      console.log(`via useEffect`);
    }
  }, [ onImageError, onImageLoad ]);

  useEffect(() => {
    function handleResize() {
      console.log(`resize: ${window.innerWidth}x${window.innerHeight}`);
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <VStack w="100%" h="100vh" spacing="0" style={{ overflow: "hidden" }}>
      {toolbar}
      <Flex
        position={"relative"}
        ref={containerRef}
        w="100%"
        h="100%"
        bg="white"
        alignItems="center"
        justifyContent="center"
        style={{
          overflow: "hidden",
          ...background,
        }}
      >
        {loadErr != null ? (
          <VStack>
            <img
              alt={t("Red stop sign")}
              src="/images/error.svg"
              style={{ width: "5rem", height: "5rem" }}
            />
            <Text>{t("Error loading image")}</Text>
            <Text>{url}</Text>
          </VStack>
        ) : (
          <></>
        )}
        {loading ? (
          <Spinner size="xl" />
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
        )}
        <img
          alt={`${url} (preload/debug)`}
          onError={() => { onImageError(); console.log(`via onError`); }}
          onLoad={() => { onImageLoad(); console.log(`via onLoad`); }}
          ref={imageRef}
          src={url}
          style={{
            opacity: isDebug ? 1 : 0,
            position: "absolute",
            top: 0,
            right: 0,
          }}
        />
        {isDebug && (
          <Text position={"absolute"} top={"0"} left={2}>
            Window size: {window.innerWidth}x{window.innerHeight}
          </Text>
        )}
        {isDebug && (
          <Text position={"absolute"} top={"14pt"} left={2}>
            Image natural size: {imageRef.current?.naturalWidth}x
            {imageRef.current?.naturalHeight}
          </Text>
        )}
        {isDebug && (
          <Text position={"absolute"} top={"28pt"} left={2}>
            Image display size: {imageCss["width"]}x{imageCss["height"]}
          </Text>
        )}
        {isDebug && (
          <Text position={"absolute"} top={"42pt"} left={2}>
            Zoom: cur={currentZoom}, url={urlZoom}, max=
            {calcMaxZoom(naturalWidth, naturalHeight, containerRef)})
          </Text>
        )}
        {isDebug && (
          <Text position={"absolute"} top={"56pt"} left={2}>
            Container boundingClientRect:{" "}
            {containerRef.current?.getBoundingClientRect().width}x
            {containerRef.current?.getBoundingClientRect().height}
          </Text>
        )}
        {isDebug && (
          <Text position={"absolute"} top={"70pt"} left={2}>
            Container client: {containerRef.current?.clientWidth}x
            {containerRef.current?.clientHeight}
          </Text>
        )}
      </Flex>
    </VStack>
  );
}

// from https://24ways.org/2010/calculating-color-contrast/
function getContrastYIQ(hexcolor: String) {
  var r = parseInt(hexcolor.substr(0, 2), 16);
  var g = parseInt(hexcolor.substr(2, 2), 16);
  var b = parseInt(hexcolor.substr(4, 2), 16);
  var yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? "black" : "white";
}
