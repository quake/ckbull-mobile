import BasePage from "module/common/component/layout/BasePage/BasePage";
import { Text } from "react-native";

const ReceiveScreen = (): JSX.Element => {
    return (
        <BasePage appearance="dark" showIcons={false}>
            <Text style={{color: "white"}}>Send page</Text>
        </BasePage>
    );
};

export default ReceiveScreen;