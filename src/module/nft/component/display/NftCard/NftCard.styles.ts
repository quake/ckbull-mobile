import styled from "@peersyst/react-native-styled";
import { Image } from "@peersyst/react-native-components";
import { Dimensions } from "react-native";
import MainListCard from "module/main/component/display/MainListCard/MainListCard";

const NFT_CARD_WIDTH = Dimensions.get("window").width / 3.3;

export const NftCardRoot = styled(MainListCard, { gap: "6%" })(() => ({
    paddingVertical: 14,
}));

export const NftCardImage = styled(Image)(({ theme }) => ({
    borderRadius: 4,
    backgroundColor: theme.palette.gray[300],
    width: NFT_CARD_WIDTH,
    height: NFT_CARD_WIDTH,
}));
