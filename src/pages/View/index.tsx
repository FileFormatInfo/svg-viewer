/* eslint-disable no-console */
import { useRef } from "react";
import React from "react";



import {
	Box,
	VStack,
	StackProps,
	Container,
	ContainerProps,
	Flex,
	Text,
	useBreakpointValue,
	useColorModeValue,
} from "@chakra-ui/react";
import useResizeObserver from "@react-hook/resize-observer";



import { t } from "utils";
import { setQueryStringParam } from "utils/querystring";
import { safeParseFloat } from "utils/safeParseFloat";



import { ErrorPageStrategy } from "shared/Result";
import { useNavigate, useSearchParams } from "shared/Router";



import { DesktopToolbar } from "./DesktopToolbar";
import { MobileToolbar } from "./MobileToolbar";
import { calcMaxZoom } from './calcMaxZoom';


const ViewPage = () => {
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const imageRef = useRef<HTMLImageElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);

	const imageSize = useSize(imageRef);
	const containerSize = useSize(containerRef);

	const url = searchParams.get("url") || undefined;
	const urlZoom = searchParams.get("zoom") || "1";
	let initialZoom = safeParseFloat(urlZoom, 1);
	if (urlZoom === "max") {
		initialZoom = calcMaxZoom(imageRef, containerRef);
	}
	//const [currentZoom, setZoom] = React.useState(initialZoom);
	let currentZoom = initialZoom;

	const zoomCss: Record<string, string> = {};
	if (imageRef.current != null) {
		zoomCss["width"] = `${currentZoom * imageRef.current.naturalWidth}px`;
		zoomCss["height"] = `${currentZoom * imageRef.current.naturalHeight}px`;
	}
	console.log(`render currentZoom: ${currentZoom}, ${initialZoom}, ${urlZoom}, ${imageRef.current?.naturalWidth}, ${imageRef.current?.naturalHeight}`);

	const bg = searchParams.get("bg") || "memphis-mini";
	const background: Record<string, string> = {};
	if (/^#[0-9A-Fa-f]{6}$/.test(bg)) {
		background["backgroundColor"] = bg;
	} else if (/^[-a-z]+$/.test(bg)) {
		background["backgroundImage"] = `url(/images/backgrounds/${bg}.png)`;
		background["backgroundColor"] = useColorModeValue("#fff", "#111");
	} else {
		background["backgroundColor"] = "#eeeeee";
	}

	const border = searchParams.get("border") || "dash";
	const borderCss: Record<string, string> = {};
	const borderColor = bg === "#111111" ? "#ffffff" : "#000000"; // LATER: more robust color selection algorithm
	if (border === "dash") {
		borderCss["outline"] = `1px dashed ${borderColor}`;
	} else if (border === "thin") {
		borderCss["outline"] = `1px solid ${borderColor}`;
	} else if (border === "thick") {
		borderCss["outline"] = `4px solid ${borderColor}`;
	} else {
		borderCss["outline"] = "none";
	}
	const isDebug = (searchParams.get("debug") || "0") === "1";

	const isSmall = window.innerWidth < 768;
	console.log(`isSmall: ${isSmall} ${window.innerWidth}`);

	const toolbar = useBreakpointValue({
		base: <MobileToolbar currentZoom={currentZoom} />,
		lg: <DesktopToolbar currentZoom={currentZoom} />,
	}) || <DesktopToolbar currentZoom={currentZoom} />;

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
				style={{ overflow: "hidden", ...background }}
			>
				<img
					ref={imageRef}
					src={url}
					style={{
						//visibility: "hidden",
						overflow: "auto auto",
						...zoomCss,
						...borderCss,
					}}
					onLoad={() => {
						// eslint-disable-next-line no-console
						console.log(
							`onload: ${currentZoom}, ${imageRef.current?.naturalWidth}, ${imageRef.current?.naturalHeight}`
						);
						if (urlZoom === "max") {
							//setZoom(calcMaxZoom(imageRef, containerRef));
							currentZoom = calcMaxZoom(imageRef, containerRef);
						}
						if (imageRef.current) {
							imageRef.current.style.width = `${
								currentZoom * imageRef.current.naturalWidth
							}px`;
							imageRef.current.style.height = `${
								currentZoom * imageRef.current.naturalHeight
							}px`;
						}
					}}
				/>
				{isDebug && (
					<Text position={"absolute"} top={0} left={2}>
						Image zoomed size: {imageSize.width} x {imageSize.height}
					</Text>
				)}
				{isDebug && (
					<Text position={"absolute"} top={"14pt"} left={2}>
						Image actual size: {imageRef.current?.naturalWidth}x
						{imageRef.current?.naturalHeight}
					</Text>
				)}
				{isDebug && (
					<Text position={"absolute"} top={"28pt"} left={2}>
						Container size: {containerSize.width}x{containerSize.height}
					</Text>
				)}
				{isDebug && (
					<Text position={"absolute"} top={"42pt"} left={2}>
						Container boundingClientRect: {containerRef.current?.getBoundingClientRect().width}x{containerRef.current?.getBoundingClientRect().height}
					</Text>
				)}
				{isDebug && (
					<Text position={"absolute"} top={"56pt"} left={2}>
						Container client: {containerRef.current?.clientWidth}x{containerRef.current?.clientHeight}
					</Text>
				)}
				{isDebug && (
					<Text position={"absolute"} top={"70pt"} left={2}>
						Window size: {window.innerWidth}x{window.innerHeight}
					</Text>
				)}
				{isDebug && (
					<Text position={"absolute"} top={"84pt"} left={2}>
						Zoom: {urlZoom} (cur={currentZoom}, init={initialZoom}, max={calcMaxZoom(imageRef, containerRef)})
					</Text>
				)}
			</Flex>
		</VStack>
	);
};

const useSize = (target: React.RefObject<HTMLElement>) => {
	const [size, setSize] = React.useState({ width: 0, height: 0 });

	React.useLayoutEffect(() => {
		if (target.current == null) {
			return;
		}
		setSize(target.current.getBoundingClientRect());
		//target.current.style.opacity = "1";
		setInterval( () => { if (target.current) { target.current.style.visibility = "visible"; }}, 1000);
	}, [target]);

	// Where the magic happens
	useResizeObserver(target, (entry) => setSize(entry.contentRect));
	return size;
};

export const Component = ViewPage;

export const ErrorBoundary = ErrorPageStrategy;