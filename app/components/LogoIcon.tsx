type LogoIconProps = {
    boxSize?: number | string;
    className?: string;
};

const LogoIcon = ({ boxSize = 40, className }: LogoIconProps) => {
    const size = typeof boxSize === "number" ? `${boxSize}px` : boxSize;
    return (
        <img
            src="/favicon.svg"
            alt="SVG Viewer logo"
            className={className}
            style={{ width: size, height: size }}
        />
    );
};

export { LogoIcon };
