import { Icon, IconButton } from "@chakra-ui/react";

import { Link as RemixLink } from "@remix-run/react";
import { PiArrowSquareOutBold } from "react-icons/pi";

interface IProps {
    boxSize: string;
    link: string;
    size: string;
    text: string;
}

function ExitButton({
    text,
    link,
}: IProps) {

    return (
        <IconButton
            aria-label={text}
            title={text}
            variant="outline"
        >
            <RemixLink to={link}>
                <Icon fontSize="3xl">
                    <PiArrowSquareOutBold />
                </Icon>
            </RemixLink>
        </IconButton>
    );
}

export { ExitButton };
