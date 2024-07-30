"use client";
import { IconType } from "react-icons";

import { Icon, IconButton } from "@chakra-ui/react";

import { Link as NextLink } from "@chakra-ui/next-js";

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
    <NextLink href={href}>
      <IconButton
        aria-label={ariaLabel}
        icon={<Icon boxSize={boxSize} as={icon} />}
        isActive={isActive}
        size={size}
        title={ariaLabel}
      />
    </NextLink>
  );
}

export { ToolbarButton };
