import { Col, ElementStyler, Typography } from "@peersyst/react-native-components";
import { ButtonProps } from "module/common/component/input/Button/Button.types";
import { ReactElement } from "react";
import { MainButtonRoot } from "./MainButton.styles";
import DarkThemeProvider from "module/common/component/util/ThemeProvider/DarkThemeProvider";

export interface MainButtonProps extends Omit<ButtonProps, "children" | "rounded" | "leftIcon" | "rightIcon" | "variant" | "size"> {
    icon: ReactElement;
    label?: string;
}

const MainButton = ({ icon, label, ...buttonProps }: MainButtonProps): JSX.Element => (
    <DarkThemeProvider>
        <MainButtonRoot variant="primary" size="lg" {...buttonProps}>
            {
                <Col alignItems={"center"} justifyContent="center">
                    <ElementStyler style={{ flex: 1 }}>{icon}</ElementStyler>
                    <Typography variant="body4Light" numberOfLines={1} adjustsFontSizeToFit>
                        {label}
                    </Typography>
                </Col>
            }
        </MainButtonRoot>
    </DarkThemeProvider>
);

export default MainButton;
