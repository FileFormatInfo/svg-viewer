/* eslint-disable no-console */
import { useRef } from "react";
import React from "react";



import { Box, VStack, StackProps, Container, ContainerProps, Flex, Spinner, Text, useBreakpointValue, useColorModeValue } from "@chakra-ui/react";
import useResizeObserver from "@react-hook/resize-observer";



import { t } from "utils";
import { setQueryStringParam } from "utils/querystring";
import { safeParseFloat } from "utils/safeParseFloat";



import { ErrorPageStrategy } from "shared/Result";
import { useSearchParams } from "shared/Router";



import { DesktopToolbar } from "./DesktopToolbar";
import { MobileToolbar } from "./MobileToolbar";
import { calcMaxZoom } from './calcMaxZoom';


const ViewPage = () => {
	const [searchParams] = useSearchParams();
	const url = searchParams.get("url") || undefined;

	const [naturalWidth, setNaturalWidth] = React.useState(1);
	const [naturalHeight, setNaturalHeight] = React.useState(1);
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
	const background: Record<string, string> = {};
	let borderColor:String;
	if (/^#[0-9A-Fa-f]{6}$/.test(bg)) {
		background["backgroundColor"] = bg;
		borderColor = getContrastYIQ(bg.slice(1));
	} else if (/^[-a-z]+$/.test(bg)) {
		background["backgroundImage"] = `url(/images/backgrounds/${bg}.png)`;
		background["backgroundColor"] = useColorModeValue("#fff", "#111");
		borderColor = useColorModeValue("#000", "#fff");
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
				style={{
					overflow: "hidden",
					...background
				}}
			>
				{loadErr != null ? (
					<VStack>
						<img
							src="/images/error.svg"
							style={{width: "5rem", height: "5rem"}}
						/>
						<Text>
							{t("Error loading image")}
						</Text>
						<Text>
							{url}
						</Text>
					</VStack>
				) : ( <></> )}
				{loading ? (<Spinner size="xl" />) : (
				<img
					src={url}
					style={{
						objectFit: "cover",
						overflow: "auto",
						...imageCss,
					}}
				/>
				)}
				<img
					onError={() => {
						console.log(`onerror: ${url}`);
						setLoadErr({});
						setLoading(false);
					}}
					onLoad={() => {
						console.log(
							`onload: ${currentZoom}, ${imageRef.current?.naturalWidth}, ${imageRef.current?.naturalHeight}`
						);
						setLoading(false);
						setNaturalWidth(imageRef.current?.naturalWidth || 1);
						setNaturalHeight(imageRef.current?.naturalHeight || 1);
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
						Image display size: {imageCss["width"]}x
						{imageCss["height"]}
					</Text>
				)}
				{isDebug && (
					<Text position={"absolute"} top={"42pt"} left={2}>
						Zoom: cur={currentZoom}, url={urlZoom}, max={calcMaxZoom(naturalWidth, naturalHeight, containerRef)})
					</Text>
				)}
				{isDebug && (
					<Text position={"absolute"} top={"56pt"} left={2}>
						Container boundingClientRect: {containerRef.current?.getBoundingClientRect().width}x{containerRef.current?.getBoundingClientRect().height}
					</Text>
				)}
				{isDebug && (
					<Text position={"absolute"} top={"70pt"} left={2}>
						Container client: {containerRef.current?.clientWidth}x{containerRef.current?.clientHeight}
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

// from https://24ways.org/2010/calculating-color-contrast/
function getContrastYIQ(hexcolor:String){
	var r = parseInt(hexcolor.substr(0,2),16);
	var g = parseInt(hexcolor.substr(2,2),16);
	var b = parseInt(hexcolor.substr(4,2),16);
	var yiq = ((r*299)+(g*587)+(b*114))/1000;
	return (yiq >= 128) ? 'black' : 'white';
}

export const Component = ViewPage;

export const ErrorBoundary = ErrorPageStrategy;