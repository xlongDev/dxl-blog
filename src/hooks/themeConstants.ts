/**
 * 主题常量配置文件
 * 集中管理所有主题相关的配置信息
 */

import {
  PaletteIcon,
  GreenThemeIcon,
  PurpleThemeIcon,
  OrangeThemeIcon,
  DefaultThemeIcon,
  BlueThemeIcon,
  PinkThemeIcon,
  BrownThemeIcon,
} from "@/components/icons/ThemeIcons";
import { ThemeOption, ThemeType } from "./useThemeUtils";

// 所有可用的主题选项
export const THEME_OPTIONS: ThemeOption[] = [
  { name: "默认", value: "light", icon: DefaultThemeIcon },
  { name: "暗黑", value: "dark", icon: DefaultThemeIcon },
  { name: "绿色", value: "green", icon: GreenThemeIcon },
  { name: "紫色", value: "purple", icon: PurpleThemeIcon },
  { name: "橙色", value: "orange", icon: OrangeThemeIcon },
  { name: "蓝色", value: "blue", icon: BlueThemeIcon },
  { name: "粉色", value: "pink", icon: PinkThemeIcon },
  { name: "棕色", value: "brown", icon: BrownThemeIcon },
];

// 主题颜色映射
export const THEME_COLORS: Record<ThemeType, string> = {
  light: "#a9b1d6",
  dark: "#1a1b26",
  green: "#a9d6b6",
  purple: "#c9b6d6",
  orange: "#d6c9b6",
  blue: "#b6c9d6",
  pink: "#d6b6c9",
  brown: "#d0c0b0",
};

// 主题背景色映射
export const THEME_BG_COLORS: Record<ThemeType, string> = {
  light: "hsl(210 30% 96%)",
  dark: "hsl(225 35% 12%)",
  green: "hsl(150 30% 96%)",
  purple: "hsl(270 30% 96%)",
  orange: "hsl(30 30% 96%)",
  blue: "hsl(210 30% 96%)",
  pink: "hsl(330 30% 96%)",
  brown: "hsl(30 25% 94%)",
};

// 主题文本颜色映射
export const THEME_TEXT_COLORS: Record<ThemeType, string> = {
  light: "hsl(215 25% 27%)",
  dark: "hsl(0 0% 100%)",
  green: "hsl(155 25% 27%)",
  purple: "hsl(275 25% 27%)",
  orange: "hsl(35 25% 27%)",
  blue: "hsl(215 25% 27%)",
  pink: "hsl(335 25% 27%)",
  brown: "hsl(35 30% 25%)",
};

// 主题CSS类名映射
export const THEME_CLASS_NAMES: Record<ThemeType, string> = {
  light: "light",
  dark: "dark",
  green: "theme-green",
  purple: "theme-purple",
  orange: "theme-orange",
  blue: "theme-blue",
  pink: "theme-pink",
  brown: "theme-brown",
};
