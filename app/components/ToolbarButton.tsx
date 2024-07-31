import { IconType } from "react-icons";

import { Icon, IconButton } from "@chakra-ui/react";

import { Link as RemixLink, useSearchParams } from "@remix-run/react";

interface IProps {
  ariaLabel: string;
  boxSize: string;
  className?: string;
  param: string;
  value: string;
  icon: IconType;
  isActive: boolean;
  size: string;
}

function ToolbarButton({
  ariaLabel,
  boxSize,
  className,
  param,
  value,
  icon,
  isActive,
  size,
}: IProps) {

  const [searchParams] = useSearchParams();
  searchParams.set(param, value)

  return (
      <IconButton
        as={RemixLink}
        aria-label={ariaLabel}
        className={className}
        icon={<Icon boxSize={boxSize} as={icon} />}
        isActive={isActive}
        size={size}
        title={ariaLabel}
        to={`?${searchParams.toString()}`}
      />
  );
}

export { ToolbarButton };
