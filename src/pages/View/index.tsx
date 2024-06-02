/* eslint-disable no-console */
import { useRef } from 'react';



import {
  Box,
  VStack,
  StackProps,
  Container,
  ContainerProps,
  Flex,
  useBreakpoint,
} from "@chakra-ui/react";



import { t } from "utils";
import { setQueryStringParam } from 'utils/querystring';
import { safeParseFloat } from "utils/safeParseFloat";



import { Page, PageHeader } from "shared/Layout";
import { ErrorPageStrategy } from "shared/Result";
import { useNavigate, useSearchParams } from "shared/Router";



import { withRequireImage } from "modules/image/application";



import { DesktopToolbar } from "./DesktopToolbar";
import { MobileToolbar } from './MobileToolbar';


const PreviewPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const imageRef = useRef<HTMLImageElement>(null); 
  const containerRef = useRef<HTMLDivElement>(null);

  const url = searchParams.get('url') || undefined;
  const zoom = searchParams.get('zoom') || '1'
  let zoomVal = safeParseFloat(zoom, 1);
  if (zoom === 'max') {
    zoomVal = calcMaxZoom(imageRef, containerRef);
  };
  const zoomCss:Record<string, string> = {};
  if (imageRef.current != null) {
    zoomCss["width"] = `${zoomVal * imageRef.current.naturalWidth}px`;
    zoomCss["height"] = `${zoomVal * imageRef.current.naturalHeight}px`;
  }

  const bg = searchParams.get('bg') || 'memphis-mini';
  const background: Record<string, string> = {};
  if (/^#[0-9A-Fa-f]{6}$/.test(bg)) {
    background["backgroundColor"] = bg;
  } else if (/^[-a-z]+$/.test(bg)) {
    background["backgroundImage"] = `url(/images/backgrounds/${bg}.png)`;
  } else {
    background["backgroundColor"] = '#eeeeee';
  }

  const border = searchParams.get('border') || 'dash';
  const borderCss: Record<string, string> = {};
  const borderColor = bg === '#111111' ? '#ffffff' : '#000000';   // LATER: more robust color selection algorithm
  if (border === "dash") {
    borderCss["outline"] = `1px dashed ${borderColor}`;
  } else if (border === "thin") {
    borderCss["outline"] = `1px solid ${borderColor}`;
  } else if (border === "thick") {
    borderCss["outline"] = `4px solid ${borderColor}`;
  } else {
    borderCss["outline"] = "none";
  }

  const isSmall = window.innerWidth < 768;
  console.log(`isSmall: ${isSmall} ${window.innerWidth}`)

  return (
    <VStack
      w="100%"
      h="100vh"
      spacing="0"
      style={{ overflow: 'clip'}}
    >
      { isSmall ? <MobileToolbar /> : <DesktopToolbar /> }
      <Flex ref={containerRef} w="100%" h="100%" bg="white" alignItems="center" justifyContent="center" style={{ overflow: 'clip', ...background }}>
          <img ref={imageRef} src={url} style={{ "overflow":"auto auto", ...zoomCss, ...borderCss }} onLoad={
            () => {
              // eslint-disable-next-line no-console
              console.log(`onload: ${zoom}, ${imageRef.current?.naturalWidth}, ${imageRef.current?.naturalHeight}`)
              if (zoom === 'max') {
                zoomVal = calcMaxZoom(imageRef, containerRef);
              }
              if (imageRef.current) {
                imageRef.current.style.width =
                  `${zoomVal * imageRef.current.naturalWidth}px`;
                imageRef.current.style.height = `${
                  zoomVal * imageRef.current.naturalHeight
                }px`;
              }
            }
          }/>
      </Flex>
    </VStack>
  );
};

function calcMaxZoom(imageRef: React.RefObject<HTMLImageElement>, containerRef: React.RefObject<HTMLDivElement>) {
  if (imageRef.current != null && containerRef.current != null) {

    // -4 so there is room for the border to be visible
    const maxZoom = Math.min(
      (window.innerWidth - 4) / imageRef.current.naturalWidth,
      (containerRef.current.clientHeight - 4) / imageRef.current.naturalHeight
    );
    return maxZoom;
  }
  return 1;
}

export const Component = PreviewPage; //withRequireImage(PreviewPage, { to: "/open.html" });

export const ErrorBoundary = ErrorPageStrategy;