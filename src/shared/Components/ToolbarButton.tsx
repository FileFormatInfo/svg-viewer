import { IconType } from "react-icons";

import { Icon, IconButton } from "@chakra-ui/react";

import { Link as ReactRouterLink } from "../Router";

interface IProps {
	ariaLabel: string;
	boxSize: string;
	href: string;
	icon: IconType;
	isActive: boolean;
	size: string;
}

function ToolbarButton({
	ariaLabel,
	boxSize,
	href,
	icon,
	isActive,
	size,
}: IProps) {
	return (
		<IconButton
			as={ReactRouterLink}
			aria-label={ariaLabel}
			icon={<Icon boxSize={boxSize} as={icon} />}
			isActive={isActive}
			size={size}
			title={ariaLabel}
			to={href}
		/>
	);
}

export { ToolbarButton };
