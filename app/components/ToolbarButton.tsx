import { IconType } from "react-icons";
import { Icon, IconButton } from "@chakra-ui/react";
import { Link as RemixLink, useSearchParams } from "@remix-run/react";
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
    param,
    value,
    icon,
    isActive,
//    size,
}: IProps) {

    const [searchParams] = useSearchParams();
    searchParams.set(param, value);

    const activeColor = useColorModeValue("#a1a1a1", "#d4d4d4");
    const bgColor = isActive ? activeColor : undefined;    //LATER: ;
    //HACK: Chakra v3 doesn't support size when setting bgColor on IconButton!?!?

    const TheIcon = icon;

    return (
        <IconButton
            aria-label={ariaLabel}
            title={ariaLabel}
            variant="outline"
        >
            <RemixLink to={`?${searchParams.toString()}`}>
                <Icon fontSize="3xl">
                    <TheIcon color={bgColor} />
                </Icon>
            </RemixLink>
        </IconButton>
    );
}
//        to={`?${searchParams.toString()}`}
//        className={className}
//background={isActive ? activeBg : bg}
//style={{ "width": "100%", "height": "100%", "display": "flex", "justifyContent": "center", "alignItems": "center" }}

export { ToolbarButton };
