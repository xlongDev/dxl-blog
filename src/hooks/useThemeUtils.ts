"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";

export type ThemeType =
  | "light"
  | "dark"
  | "green"
  | "purple"
  | "orange"
  | "blue"
  | "pink"
  | "brown";

export interface ThemeOption {
  name: string;
  value: ThemeType;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export function useThemeUtils() {
  const { theme, setTheme } = useTheme();

  // 移除强制设置默认主题的副作用
  // 允许 next-themes 自动从 localStorage 恢复主题
  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     setTheme("light");
  //   }
  // }, []);

  const getThemeColor = (
    darkColor: string,
    lightColor: string,
    themeColors?: Record<string, string>
  ): string => {
    if (!theme) return lightColor;

    if (theme === "dark") return darkColor;
    if (theme === "light") return lightColor;

    return themeColors?.[theme] || lightColor;
  };

  const getThemeClass = (
    baseClass: string,
    themeClasses?: Record<ThemeType, string>
  ): string => {
    if (!theme || !themeClasses) return baseClass;
    return themeClasses[theme as ThemeType] || baseClass;
  };

  const getThemeValue = <T>(
    options: Record<ThemeType, T>,
    defaultValue: T
  ): T => {
    if (!theme) return defaultValue;
    return options[theme as ThemeType] || defaultValue;
  };

  const isDarkTheme = (): boolean => {
    return theme === "dark";
  };

  return {
    theme: theme as ThemeType | undefined,
    setTheme,
    getThemeColor,
    getThemeClass,
    getThemeValue,
    isDarkTheme,
  };
}