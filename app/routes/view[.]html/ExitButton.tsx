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
            href={link.trim()}
            aria-label={text}
            title={text}
            target="_top"
            rel="noreferrer"
            className="btn btn-outline btn-square join-item"
        >
            <PiArrowSquareOutBold size={24} />
        </a>
    );
}

export { ExitButton };
