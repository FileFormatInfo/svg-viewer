import React from "react";
import {
	PiCheckerboardFill,
	PiSquare,
	PiSquareFill,
	PiScribbleBold,
} from "react-icons/pi";

import {
	ButtonGroup,
	useColorModeValue,
} from "@chakra-ui/react";

import { t } from "utils";
import { getQueryStringParam, setQueryStringParam } from "utils/querystring";

import { ToolbarButton } from "shared/Components";

interface IProps {
	boxSize: string;
	size: string;
}

export const BackgroundButtons = ({ size, boxSize }: IProps) => {

	const currentBg = getQueryStringParam("bg", "memphis-mini");

	return (
		<ButtonGroup isAttached>
			<ToolbarButton
				ariaLabel={t("Squiggles background")}
				size={size}
				href={`/view.html?${setQueryStringParam("bg", "memphis-mini")}`}
				isActive={currentBg === "memphis-mini"}
				icon={PiScribbleBold}
				boxSize={boxSize}
			/>
			<ToolbarButton
				ariaLabel="Checkboard background"
				boxSize={boxSize}
				href={`/view.html?${setQueryStringParam("bg", "checkerboard")}`}
				isActive={currentBg === "checkerboard"}
				size={size}
				icon={PiCheckerboardFill}
			/>
			<ToolbarButton
				ariaLabel="Light background"
				boxSize={boxSize}
				href={`/view.html?${setQueryStringParam("bg", "#eeeeee")}`}
				isActive={currentBg === "#eeeeee"}
				size={size}
				icon={useColorModeValue(PiSquare, PiSquareFill)}
			/>
			<ToolbarButton
				ariaLabel="Dark background"
				boxSize={boxSize}
				href={`/view.html?${setQueryStringParam("bg", "#111111")}`}
				isActive={currentBg === "#111111"}
				size={size}
				icon={useColorModeValue(PiSquareFill, PiSquare)}
			/>
		</ButtonGroup>
	);
};
