import React from "react";
import {
	PiArrowsCounterClockwiseBold,
	PiMagnifyingGlassMinusBold,
	PiMagnifyingGlassPlusBold,
	PiArrowsOutCardinalBold,
} from "react-icons/pi";

import { ButtonGroup } from "@chakra-ui/react";

import { getQueryStringParam, setQueryStringParam } from "utils/querystring";

import { ToolbarButton } from "shared/Components";

interface IProps {
	currentZoom: number;
	setZoom?: React.Dispatch<React.SetStateAction<number>>;
	boxSize: string;
	size: string;
}

export const ZoomButtons = ({ currentZoom, size, boxSize }: IProps) => {
	let zoomOut = currentZoom > 1 ? currentZoom - 1 : currentZoom * 0.5;
	if (zoomOut < 0.01) {
		zoomOut = 0.01;
	}
	return (
		<ButtonGroup isAttached>
			<ToolbarButton
				ariaLabel="Zoom out"
				boxSize={boxSize}
				href={`/view.html?${setQueryStringParam("zoom", String(zoomOut))}`}
				isActive={false}
				size={size}
				icon={PiMagnifyingGlassMinusBold}
			/>
			<ToolbarButton
				ariaLabel="Original size"
				size={size}
				boxSize={boxSize}
				href={`/view.html?${setQueryStringParam("zoom", "1")}`}
				isActive={currentZoom === 1}
				icon={PiArrowsCounterClockwiseBold}
			/>
			<ToolbarButton
				ariaLabel="Zoom In"
				boxSize={boxSize}
				href={`/view.html?${setQueryStringParam(
					"zoom",
					String(currentZoom + 1)
				)}`}
				size={size}
				icon={PiMagnifyingGlassPlusBold}
				isActive={false}
			/>
			<ToolbarButton
				ariaLabel="Max zoom"
				boxSize={boxSize}
				href={`/view.html?${setQueryStringParam("zoom", "max")}`}
				isActive={getQueryStringParam("zoom") === "max"}
				size={size}
				icon={PiArrowsOutCardinalBold}
			/>
		</ButtonGroup>
	);
};
