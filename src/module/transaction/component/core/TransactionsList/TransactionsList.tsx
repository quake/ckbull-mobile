import useGetTransactions from "module/transaction/query/useGetTransactions";
import { translate } from "locale";
import MainList from "module/main/component/display/MainList/MainList";
import EmptyListComponent from "module/common/component/display/EmptyListComponent/EmptyListComponent";
import TransactionCard from "module/transaction/component/display/TransactionCard/TransactionCard";
import { useMemo } from "react";
import isCKBTransaction from "module/transaction/component/utils/isCKBTransaction";

const TransactionsList = (): JSX.Element => {
    const { data = [], refetch, isLoading } = useGetTransactions();
    //Get the tx that corresponds to ckbs, nfts, and tokens -> not DAO txs
    //Then order them by the latest date
    const txs = useMemo(() => data.filter((tx) => isCKBTransaction(tx.type)).reverse(), [data]);
    return (
        <MainList
            onRefresh={refetch}
            loading={isLoading}
            data={txs}
            ListEmptyComponent={isLoading ? undefined : <EmptyListComponent message={translate("no_transactions")} />}
            renderItem={({ item: tx }) => <TransactionCard transaction={tx} />}
            keyExtractor={(_, index) => index.toString()}
        />
    );
};

export default TransactionsList;
