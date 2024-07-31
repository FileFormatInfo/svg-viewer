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
    boxSize,
    size,
}: IProps) {

    return (
        <IconButton
            as={RemixLink}
            aria-label={text}
            icon={<Icon boxSize={boxSize} as={PiArrowSquareOutBold} />}
            size={size}
            title={text}
            to={link}
            variant="ghost"
        />
    );
}

export { ExitButton };