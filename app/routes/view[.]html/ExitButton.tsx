import { Link as RemixLink } from "react-router";
import { PiArrowSquareOutBold } from "react-icons/pi";

interface IProps {
    boxSize?: string;
    link: string;
    size?: string;
    text: string;
}

function ExitButton({
    text,
    link,
}: IProps) {

    return (
        <RemixLink
            to={link}
            aria-label={text}
            title={text}
            className="btn btn-outline btn-square join-item"
        >
            <PiArrowSquareOutBold className="text-xl" />
        </RemixLink>
    );
}

export { ExitButton };
