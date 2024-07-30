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
    <Link href={href}>
      <IconButton
        aria-label={ariaLabel}
        as="div"
        icon={<Icon boxSize={boxSize} as={icon} />}
        isActive={isActive}
        size={size}
        title={ariaLabel}
      />
    </Link>
  );
}

export { ToolbarButton };
