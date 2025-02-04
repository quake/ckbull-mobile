import Providers from "./Providers";
import Navigator from "./navigator/Navigator";
import { useLoad } from "module/common/query/useLoad";
import LogoPage from "module/common/component/layout/LogoPage/LogoPage";
import { StatusBar, Suspense } from "@peersyst/react-native-components";
import { useRecoilValue } from "recoil";
import settingsState from "module/settings/state/SettingsState";
import { Platform, UIManager } from "react-native";

if (typeof BigInt === "undefined") global.BigInt = require("big-integer");

if (Platform.OS === "android") {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
}

const App = (): JSX.Element => {
    const loading = useLoad();
    const { loading: loadingSettings = false } = useRecoilValue(settingsState);

    return (
        <>
            <Suspense fallback={<LogoPage />} isLoading={loading || loadingSettings}>
                <Navigator />
            </Suspense>
            <StatusBar appearance="dark" />
        </>
    );
};

export default function Root(): JSX.Element {
    return (
        <Providers>
            <App />
        </Providers>
    );
}
