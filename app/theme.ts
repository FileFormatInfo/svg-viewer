/*
import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
    initialColorMode: "system",
    useSystemColorMode: true,
};

export const theme = extendTheme({ config });
*/
import { createSystem, defaultConfig } from "@chakra-ui/react";
export const themeSystem = createSystem(defaultConfig, {
    theme: {

    },
});
