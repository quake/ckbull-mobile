import { Animated } from "@peersyst/react-native-components";
import NumericPad from "module/common/component/input/NumericPad/NumericPad";
import { WalletStorage } from "module/wallet/WalletStorage";
import { useLogoPageFlex } from "module/common/component/layout/LogoPage/LogoPageContext";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import walletState from "module/wallet/state/WalletState";
import { notificationAsync, NotificationFeedbackType } from "expo-haptics";
import { useTranslate } from "module/common/hook/useTranslate";
import DarkThemeProvider from "module/common/component/util/ThemeProvider/DarkThemeProvider";

const AnimatedNumericPad = Animated.createAnimatedComponent.fade(NumericPad, { duration: 200, delay: 400 });

const SetWalletPinScreen = (): JSX.Element => {
    const translate = useTranslate();
    const [error, setError] = useState(false);
    const setWalletState = useSetRecoilState(walletState);
    useLogoPageFlex(0.4);
    const handlePinSubmit = async (pin: string) => {
        const storedPin = await WalletStorage.getPin();
        if (storedPin === pin) {
            setWalletState((state) => ({ ...state, isAuthenticated: true }));
        } else {
            setError(true);
            notificationAsync(NotificationFeedbackType.Error);
        }
    };

    // Required to get the animation working
    const [animateNumericPad, setAnimateNumericPad] = useState(false);
    useEffect(() => {
        setAnimateNumericPad(true);
    }, []);

    return (
        <DarkThemeProvider>
            <AnimatedNumericPad
                belowLogo
                in={animateNumericPad}
                error={error}
                onSubmit={handlePinSubmit}
                placeholder={translate("enter_your_pin")}
            />
        </DarkThemeProvider>
    );
};

export default SetWalletPinScreen;
