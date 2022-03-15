import styled from "@peersyst/react-native-styled";
import { translate } from "locale";
import CopyToClipboardIcon from "module/common/component/input/CopyToClipboardIcon/CopyToClipboardIcon";
import Card from "module/common/component/surface/Card/Card";
import useRoute from "module/common/hook/useRoute";
import { Col, Row, Typography } from "react-native-components";
import GoBack from "../../navigation/GoBack";

const ReceiveCardContent = styled(Col, { gap: "12%" })(() => ({
    paddingHorizontal: "4%",
    paddingBottom: "5%",
}));

const TextAdress = styled(Typography, { textTransform: "uppercase" })(() => ({
    width: "75%",
}));

const ReceiveCard = (): JSX.Element => {
    const { params } = useRoute();

    return (
        <Card>
            <ReceiveCardContent>
                <Row justifyContent="space-between" alignItems="center">
                    <TextAdress variant="h3">{params?.address}</TextAdress>
                    <CopyToClipboardIcon filled text={params?.address || ""} toastMessage={translate("address_copied")} />
                </Row>
                <Typography variant={"caption"}>{translate("receive_info")}</Typography>
                <GoBack />
            </ReceiveCardContent>
        </Card>
    );
};

export default ReceiveCard;
