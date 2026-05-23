import { PiSunBold, PiMoonBold } from "react-icons/pi";
import { useColorMode } from "~/components/ui/color-mode";

const ToggleModeButton = (
  props: Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "aria-label" | "onClick">
) => {

  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <button
      type="button"
      aria-label="Switch mode"
      className="btn btn-ghost btn-square scriptonly"
      onClick={toggleColorMode}
      {...props}
    >
      {colorMode === "light" ? (
        <PiMoonBold className="text-xl" />
      ) : (
        <PiSunBold className="text-xl" />
      )}
    </button>
  );
};

export {
    ToggleModeButton,
 };
