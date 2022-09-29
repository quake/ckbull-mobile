import { List } from "@peersyst/react-native-components";
import { ListProps } from "@peersyst/react-native-components";
import useCkbSync from "module/wallet/hook/useCkbSync";

export type MainListProps = Omit<ListProps, "ItemSeparatorComponent" | "style">;

const MainList = ({ indicatorStyle, loading, onRefresh, ...rest }: MainListProps): JSX.Element => {
    const { synchronizing, synchronize } = useCkbSync();
    const handleRefresh = async () => {
        await synchronize();
        onRefresh?.();
    };

    return (
        <List
            style={{ paddingHorizontal: "6%", paddingTop: 15 }}
            refreshControlProps={{ tintColor: "black" }}
            indicatorStyle={indicatorStyle || "black"}
            loading={synchronizing || loading}
            onRefresh={handleRefresh}
            {...rest}
        />
    );
};

export default MainList;
