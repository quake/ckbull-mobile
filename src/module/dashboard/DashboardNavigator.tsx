import DashboardScreen from "module/dashboard/DashboardScreen";
import Stack from "stack-navigator";

export enum DashboardScreens {
    MAIN = "dashboard",
}

export const DashboardNavigator = (
    <>
        <Stack.Screen name={DashboardScreens.MAIN} component={DashboardScreen} />
    </>
);