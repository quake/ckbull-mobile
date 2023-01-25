/* eslint-disable @typescript-eslint/no-empty-interface */
import "@peersyst/react-native-styled";
import { Theme as RNCTheme } from "@peersyst/react-native-components";

export interface ThemeOverlay {
    "80%": string;
    "60%": string;
    "48%": string;
    "32%": string;
    "24%": string;
    "16%": string;
    "12%": string;
    "8%": string;
}

export interface ThemeOverlays {
    100: ThemeOverlay;
    300: ThemeOverlay;
    500: ThemeOverlay;
    700: ThemeOverlay;
    900: ThemeOverlay;
}

export interface ThemeGreen {
    200: string;
    600: string;
    800: string;
}

export interface ThemeGray {
    0: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
}

export type ThemeGradient = [string, string];

// Custom components theme
declare module "@peersyst/react-native-components" {
    export interface Theme {
        borderRadiusSm: number;
        borderRadiusXs: number;
    }

    export interface CreateTheme {
        borderRadiusSm?: number;
        borderRadiusXs?: number;
    }

    export interface ThemeGradients {
        greenDarkGreen: ThemeGradient;
        greenViolet: ThemeGradient;
    }

    export interface ThemePalette {
        white: string;
        black: string;
        gold: string;
        red: string;
        orange: string;
        purple: string;
        violet: string;
        blue: string;
        green: ThemeGreen;
        gray: ThemeGray;
        gradient: ThemeGradients;
        overlay: ThemeOverlays;
        //Utils
        wallet: string[];
        appbar: string;
        bottomBar: string;
        paper: string;
    }

    export interface TypographyVariantsOverrides {
        h4: false;
        h5: false;
        h6: false;
        subtitle1: false;
        subtitle2: false;
        h1Strong: true;
        h1Regular: true;
        h1Light: true;
        h2Strong: true;
        h2Regular: true;
        h2Light: true;
        h3Strong: true;
        h3Regular: true;
        h3Light: true;
        h4Strong: true;
        h4Regular: true;
        h4Light: true;
        body1Strong: true;
        body1Regular: true;
        body1Light: true;
        body2Strong: true;
        body2Regular: true;
        body2Light: true;
        body3Strong: true;
        body3Regular: true;
        body3Light: true;
        body4Strong: true;
        body4Regular: true;
        body4Light: true;
    }
}

// Type styled components theme with our components theme
declare module "@peersyst/react-native-styled" {
    export interface Theme extends RNCTheme {}
}
