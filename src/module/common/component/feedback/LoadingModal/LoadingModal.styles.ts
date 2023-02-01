import styled from "@peersyst/react-native-styled";
import { Col, Typography } from "@peersyst/react-native-components";
import GradientPage from "module/common/component/layout/GradientPage/GradientPage";
import { View } from "react-native";
import { CircleCheckIcon } from "icons";

export const DarkLoadingModalOverlay = styled(View)(({ theme }) => ({
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: theme.palette.mode === "dark" ? theme.palette.overlay[500]["80%"] : "transparent",
}));

export const LoadingModalRoot = styled(GradientPage, { gradient: true })(() => ({
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
}));

export const LoadingModalContent = styled(Col, { flex: 0.5, justifyContent: "space-between" })(({ safeAreaInsets }) => ({
    paddingHorizontal: 20,
    paddingBottom: safeAreaInsets.bottom + 20,
}));

export const SuccessIcon = styled(CircleCheckIcon)(({ theme }) => ({
    fontSize: 72,
    color: theme.palette.mode === "dark" ? theme.palette.primary : theme.palette.white,
}));

export const LoadingModalMessage = styled(Typography)(({ theme }) => ({
    color: theme.palette.white,
}));
