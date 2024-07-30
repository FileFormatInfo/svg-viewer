"use client";
import { IconType } from "react-icons";

import { Icon, IconButton } from "@chakra-ui/react";

import Link from "next/link";

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
        aria-label={ariaLabel}
        as={Link}
        href={href}
        icon={<Icon boxSize={boxSize} as={icon} />}
        isActive={isActive}
        size={size}
        title={ariaLabel}
      />
  );
}

export { ToolbarButton };
