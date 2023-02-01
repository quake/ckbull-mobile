import Balance from "module/wallet/component/display/Balance/Balance";
import { Col } from "@peersyst/react-native-components";
import { useTranslate } from "module/common/hook/useTranslate";
import DAOCardLabel from "module/dao/component/core/DAOAccountCard/DAOCardBalance/DAOCardLabel/DAOCardLabel";
import { DAOBalance } from "module/sdk";

export interface DAOCardBalanceProps {
    daoBalance: DAOBalance | undefined;
    estimatedApc: string | undefined;
    freeBalance: number | undefined;
    loading?: boolean;
}

const DAOCardBalance = ({ daoBalance, estimatedApc = "0", freeBalance = 0, loading = false }: DAOCardBalanceProps): JSX.Element => {
    const translate = useTranslate();

    return (
        <Col gap={12}>
            <DAOCardLabel loading={loading} label={translate("available")} Component={Balance} balance={freeBalance} units="token" />
            <DAOCardLabel
                loading={loading}
                label={translate("locked")}
                Component={Balance}
                balance={daoBalance?.daoDeposit || 0}
                units="token"
            />
            <DAOCardLabel loading={loading} label={translate("estimated_apc")}>{`${estimatedApc}%`}</DAOCardLabel>
        </Col>
    );
};

export default DAOCardBalance;
