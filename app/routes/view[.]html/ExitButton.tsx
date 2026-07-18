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

    console.log(`ExitButton: link=${link}, text=${text}`);

    return (
        <a
            href={link}
            aria-label={text}
            title={text}
            className="btn btn-outline btn-square join-item"
        >
            <PiArrowSquareOutBold className="text-xl" />
        </a>
    );
}

export { ExitButton };
