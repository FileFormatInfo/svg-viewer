import { Link as RemixLink } from "react-router";

import { ToggleModeButton } from "./ToggleModeButton";
import { LogoIcon } from "./LogoIcon";

export const Navbar = () => {
    return (
        <header className="navbar sticky top-0 z-10 min-h-14 border-b border-base-300 bg-base-100 px-4 py-2">
            <div className="navbar-start">
                <RemixLink to="/" className="flex items-center gap-3 no-underline">
                    <LogoIcon boxSize={40} />
                    <span className="text-xl font-bold">SVG Viewer</span>
                </RemixLink>
            </div>
            <div className="navbar-end">
                <ToggleModeButton />
            </div>
        </header>
    );
};

