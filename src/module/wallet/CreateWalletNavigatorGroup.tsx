import { useLogoPageFlex } from "module/common/component/layout/LogoPage/LogoPageContext";
import { Animated, TabPanel, Tabs, useTabs } from "react-native-components";
import { useState } from "react";
import { AuthScreens } from "module/auth/AuthNavigatorGroup";
import SetWalletNameScreen from "module/wallet/screen/SetWalletNameScreen";
import { translate } from "locale";
import GlassNavigator from "module/common/component/navigation/GlassNavigator/GlassNavigator";
import SetWalletPinScreen from "module/wallet/screen/SetWalletPinScreen";
import WalletAdvisesScreen from "module/wallet/screen/WalletAdvisesScreen";
import WalletMnemonicScreen from "module/wallet/screen/WalletMnemonicScreen";
import PickWalletMnemonicScreen from "module/wallet/screen/PickWalletMnemonicScreen";
import CreateWalletSuccessScreen from "module/wallet/screen/CreateWalletSuccessScreen";

export enum CreateWalletScreens {
    SET_WALLET_NAME,
    WALLET_ADVISES,
    WALLET_MNEMONIC,
    PICK_WALLET_MNEMONIC,
    SET_WALLET_PIN,
    CREATE_WALLET_SUCCESS,
}

const AnimatedGlassNavigator = Animated.createAnimatedComponent.slide(GlassNavigator, {
    duration: 400,
    appear: true,
    direction: "up",
    unmountOnExit: true,
});

const CreateWalletNavigatorGroup = () => {
    const [activeTab, setActiveTab] = useState(0);
    const setTab = useTabs()[1];
    const [showGlass, setShowGlass] = useState(true);
    const [showPin, setShowPin] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    useLogoPageFlex(showPin ? 0.1 : showSuccess ? 1 : 0.4);

    const handleBack = () => {
        if (activeTab === CreateWalletScreens.SET_WALLET_NAME) {
            setShowGlass(false);
        } else if (activeTab === CreateWalletScreens.SET_WALLET_PIN) {
            setShowPin(false);
            setShowGlass(true);
            setActiveTab(CreateWalletScreens.SET_WALLET_NAME);
        } else if (activeTab === CreateWalletScreens.WALLET_ADVISES) {
            setShowPin(true);
            setShowGlass(false);
        } else setActiveTab((t) => t - 1);
    };

    const handleTabChange = (t: number) => {
        if (t === CreateWalletScreens.SET_WALLET_PIN) {
            setShowPin(true);
            setShowGlass(false);
        } else if (t === CreateWalletScreens.SET_WALLET_NAME || t === CreateWalletScreens.WALLET_ADVISES) {
            setShowPin(false);
            setShowGlass(true);
            setActiveTab(t);
        } else if (t === CreateWalletScreens.CREATE_WALLET_SUCCESS) {
            setShowGlass(false);
            setShowSuccess(true);
        } else setActiveTab(t);
    };

    const handleGlassExit = () => {
        if (showPin) setActiveTab(CreateWalletScreens.SET_WALLET_PIN);
        else if (showSuccess) setActiveTab(CreateWalletScreens.CREATE_WALLET_SUCCESS);
        else setTab(AuthScreens.AUTH_SWITCH);
    };

    return (
        <Tabs index={activeTab} onIndexChange={handleTabChange}>
            <AnimatedGlassNavigator
                in={showGlass}
                appear
                style={{ height: "170%", flex: 1 }}
                onExited={handleGlassExit}
                navbar={{ back: true, title: translate("create_wallet"), onBack: handleBack }}
                breadcrumbs={{ index: activeTab, length: 4 }}
            >
                <TabPanel index={CreateWalletScreens.SET_WALLET_NAME}>
                    <SetWalletNameScreen />
                </TabPanel>
                <TabPanel index={CreateWalletScreens.WALLET_ADVISES}>
                    <WalletAdvisesScreen />
                </TabPanel>
                <TabPanel index={CreateWalletScreens.WALLET_MNEMONIC}>
                    <WalletMnemonicScreen />
                </TabPanel>
                <TabPanel index={CreateWalletScreens.PICK_WALLET_MNEMONIC}>
                    <PickWalletMnemonicScreen />
                </TabPanel>
            </AnimatedGlassNavigator>
            <TabPanel index={CreateWalletScreens.SET_WALLET_PIN}>
                <SetWalletPinScreen />
            </TabPanel>
            <TabPanel index={CreateWalletScreens.CREATE_WALLET_SUCCESS}>
                <CreateWalletSuccessScreen />
            </TabPanel>
        </Tabs>
    );
};

export default CreateWalletNavigatorGroup;