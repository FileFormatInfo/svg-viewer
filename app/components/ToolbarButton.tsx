import { IconType } from "react-icons";
import { Link as RemixLink, useSearchParams } from "react-router";
import { useColorModeValue } from "./ui/color-mode";

//import { useColorModeValue } from "~/components/ui/color-mode";

interface IProps {
    ariaLabel: string;
    boxSize: string;
    className?: string;
    param: string;
    value: string;
    icon: IconType;
    isActive: boolean;
    size: 'xs' | 'sm' | 'md' | 'lg';
}

function ToolbarButton({
    ariaLabel,
    className,
    param,
    value,
    icon,
    isActive,
    size,
}: IProps) {

    const [searchParams] = useSearchParams();
    const nextSearchParams = new URLSearchParams(searchParams);
    nextSearchParams.set(param, value);

    const activeColor = useColorModeValue("#a1a1a1", "#d4d4d4");
    const bgColor = isActive ? activeColor : undefined;

    const sizeClass = {
        xs: "btn-xs",
        sm: "btn-sm",
        md: "",
        lg: "btn-lg",
    }[size];

    const TheIcon = icon;

    return (
        <RemixLink
            to={`?${nextSearchParams.toString()}`}
            className={`btn btn-outline btn-square ${sizeClass} ${className || ""}`.trim()}
            aria-label={ariaLabel}
            title={ariaLabel}
            style={isActive ? { backgroundColor: bgColor } : undefined}
        >
            <TheIcon className="text-xl" color={bgColor} />
        </RemixLink>
    );
}

export { ToolbarButton };
