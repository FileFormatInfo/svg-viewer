"use client";
import { IconType } from "react-icons";

import { Icon, IconButton } from "@chakra-ui/react";

import { Link as RemixLink, useSearchParams } from "@remix-run/react";

interface IProps {
  ariaLabel: string;
  boxSize: string;
  param: string;
  value: string;
  icon: IconType;
  isActive: boolean;
  size: string;
}

function ToolbarButton({
  ariaLabel,
  boxSize,
  param,
  value,
  icon,
  isActive,
  size,
}: IProps) {

  const [searchParams] = useSearchParams();
  searchParams.set(param, value)

  return (
      <RemixLink
      to={`?${searchParams.toString() }`}>
      <IconButton
        aria-label={ariaLabel}
        icon={<Icon boxSize={boxSize} as={icon} />}
        isActive={isActive}
        size={size}
        title={ariaLabel}
      />
    </RemixLink>
  );
}

export { ToolbarButton };
