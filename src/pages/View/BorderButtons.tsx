import {
	PiSelectionSlashLight,
	PiSelectionLight,
	PiSquareBold,
	PiSquareLight,
} from "react-icons/pi";

import { ButtonGroup } from "@chakra-ui/react";

import { getQueryStringParam, setQueryStringParam } from "utils/querystring";

import { ToolbarButton } from "shared/Components";

interface IProps {
	boxSize: string;
	size: string;
}

export const BorderButtons = ({ size, boxSize }: IProps) => {

	const currentBorder = getQueryStringParam("border", "dash");

	return (
		<ButtonGroup isAttached>
			<ToolbarButton
				ariaLabel="No border"
				boxSize={boxSize}
				href={`/view.html?${setQueryStringParam("border", "none")}`}
				icon={PiSelectionSlashLight}
				isActive={currentBorder === "none"}
				size={size}
			/>
			<ToolbarButton
				ariaLabel="Dash border"
				boxSize={boxSize}
				href={`/view.html?${setQueryStringParam("border", "dash")}`}
				icon={PiSelectionLight}
				isActive={currentBorder === "dash"}
				size={size}
			/>
			<ToolbarButton
				ariaLabel="Thin border"
				boxSize={boxSize}
				href={`/view.html?${setQueryStringParam("border", "thin")}`}
				icon={PiSquareLight}
				isActive={currentBorder === "thin"}
				size={size}
			/>
			<ToolbarButton
				ariaLabel="Thick border"
				boxSize={boxSize}
				href={`/view.html?${setQueryStringParam("border", "thick")}`}
				icon={PiSquareBold}
				isActive={currentBorder === "thick"}
				size={size}
			/>
		</ButtonGroup>
	);
};
