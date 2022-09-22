import { Backdrop, ExposedBackdropProps } from "@peersyst/react-native-components";
import MainNavigator, { MainNavigatorProps } from "module/common/component/navigation/MainNavigator/MainNavigator";
import { useWindowDimensions } from "react-native";

const MainNavigatorModal = ({
    navbar: { back, onBack, ...restNavProps } = {},
    children,
    style,
    closable = true,
    ...backdropProps
}: ExposedBackdropProps & MainNavigatorProps): JSX.Element => {
    const { height } = useWindowDimensions();
    return (
        <Backdrop closable={closable} {...backdropProps}>
            {(_open, setOpen) => (
                <MainNavigator
                    navbar={{
                        back: back && closable,
                        onBack: onBack || (() => setOpen(false)),
                        ...restNavProps,
                    }}
                    style={{ height: "90%", ...style }}
                >
                    {children}
                </MainNavigator>
            )}
        </Backdrop>
    );
};

export default MainNavigatorModal;
