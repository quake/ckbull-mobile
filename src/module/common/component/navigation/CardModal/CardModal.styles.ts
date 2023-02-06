import styled from "@peersyst/react-native-styled";
import { Col, Divider } from "@peersyst/react-native-components";
import { KeyboardAvoidingView } from "react-native";

export const CardModalContent = styled(KeyboardAvoidingView)(({ theme, dimensions }) => ({
    position: "absolute",
    bottom: 0,
    width: "100%",
    maxHeight: dimensions.height * 0.9,
    borderTopStartRadius: theme.borderRadius,
    borderTopEndRadius: theme.borderRadius,
    backgroundColor: theme.palette.component.paper,
}));

export const CardModalWrapper = styled(Col)(({ safeAreaInsets }) => ({
    paddingBottom: safeAreaInsets.bottom + 10,
    height: "100%",
}));

export const CardModalBodyWrapper = styled(Col)(() => ({
    padding: 20,
}));

export const CardModalDivider = styled(Divider)(({ theme }) => ({
    backgroundColor: theme.palette.overlay[theme.palette.mode === "light" ? "700" : "900"]["8%"],
}));