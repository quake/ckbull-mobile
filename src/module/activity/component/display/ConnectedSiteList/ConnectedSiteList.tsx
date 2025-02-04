import MainList from "module/main/component/display/MainList/MainList";
import ConnectedSite from "module/activity/component/display/ConnectedSite/ConnectedSite";
import EmptyListComponent from "module/common/component/display/EmptyListComponent/EmptyListComponent";
import useGetConnectedSites from "module/activity/queries/useGetConnectedSites";

const ConnectedSiteList = (): JSX.Element => {
    const { data: connectedSites, isLoading, refetch } = useGetConnectedSites();

    return (
        <MainList
            data={connectedSites}
            onRefresh={refetch}
            renderItem={({ item: connectedSite }) => <ConnectedSite site={connectedSite} />}
            ListEmptyComponent={isLoading ? undefined : <EmptyListComponent />}
            contentContainerStyle={{ paddingHorizontal: 20 }}
        />
    );
};

export default ConnectedSiteList;
