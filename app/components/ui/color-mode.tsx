"use client"

import { ThemeProvider, useTheme } from "next-themes"
import type { ThemeProviderProps } from "next-themes"
import * as React from "react"
import { LuMoon, LuSun } from "react-icons/lu"

export interface ColorModeProviderProps extends ThemeProviderProps {}

export function ColorModeProvider(props: ColorModeProviderProps) {
  return (
    <ThemeProvider attribute="data-theme" disableTransitionOnChange themes={["light", "dark"]} {...props} />
  )
}

function useHasMounted() {
  const [hasMounted, setHasMounted] = React.useState(false)

  React.useEffect(() => {
    setHasMounted(true)
  }, [])

  return hasMounted
}

export function useColorMode() {
  const hasMounted = useHasMounted()
  const { resolvedTheme, setTheme } = useTheme()
  const colorMode = hasMounted && resolvedTheme === "dark" ? "dark" : "light"
  const toggleColorMode = () => {
    setTheme(colorMode === "light" ? "dark" : "light")
  }

  return {
    colorMode,
    setColorMode: setTheme,
    toggleColorMode,
  }
}

export function useColorModeValue<T>(light: T, dark: T) {
  const hasMounted = useHasMounted()
  const { resolvedTheme } = useTheme()
  return hasMounted && resolvedTheme === "dark" ? dark : light
}

export function ColorModeIcon() {
  const { colorMode } = useColorMode()
  return colorMode === "light" ? <LuSun /> : <LuMoon />
}

type ColorModeButtonProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "aria-label">

export const ColorModeButton = React.forwardRef<
  HTMLButtonElement,
  ColorModeButtonProps
>(function ColorModeButton(props, ref) {
  const { toggleColorMode } = useColorMode()
  return (
    <button
      type="button"
      onClick={toggleColorMode}
      aria-label="Toggle color mode"
      className="btn btn-ghost btn-sm"
      ref={ref}
      {...props}
    >
      <ColorModeIcon />
    </button>
  )
})
