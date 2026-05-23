const links = [
    {
        label: "SVG Zone",
        href: "https://www.svg.zone/",
        icon: "https://www.svg.zone/favicon.svg",
    },
    {
        label: "Source",
        href: "https://github.com/FileFormatInfo/svg-viewer",
        icon: "https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg",
    },
    {
        label: "Integration",
        href: "https://github.com/FileFormatInfo/svg-viewer#integration",
        icon: "/images/emoji_u1f6e0.svg",
    },
    {
        label: "Contact",
        href: "https://andrew.marcuse.info/contact.html",
        icon: "https://mvi.marcuse.info/images/contact.svg",
    },
];

export const Footer = () => {
    return (
        <footer className="w-full border-t border-base-300 bg-base-100 px-3 py-3">
            <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-4">
            {links.map((link) => (
                <a key={link.href} href={link.href} className="no-underline opacity-75 transition-opacity hover:opacity-100">
                    <span className="flex items-center">
                            <img
                                src={link.icon}
                                alt={link.label}
                                style={{ height: "1.75em", width: "1.75em" }}
                            />
                        <span className="ml-1 hidden md:inline">{link.label}</span>
                    </span>
                </a>
            ))}
            </div>
        </footer>
    );
};
