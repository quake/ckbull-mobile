import { render, SuccessApiCall } from "test-utils";
import { translate } from "locale";
import { fireEvent } from "@testing-library/react-native";
import HomeTabs from "module/home/component/navigation/HomeTabs";
import * as UseWalletState from "module/wallet/hook/useWalletState";
import { mockedUseWallet } from "mocks/useWalletState";
import { CkbServiceMock } from "module/common/service/mock/CkbServiceMock";

describe("HomeTabs tests", () => {
    test("Renders correctly", () => {
        jest.spyOn(UseWalletState, "default").mockReturnValue(mockedUseWallet);
        jest.spyOn(CkbServiceMock.prototype, "getTransactions").mockReturnValue(SuccessApiCall([]));
        const screen = render(<HomeTabs />);
        expect(screen.getAllByText(translate("transactions"))).toHaveLength(1);
        fireEvent.press(screen.getByText(translate("currencies")));
        expect(screen.getAllByText(translate("currencies"))).toHaveLength(1);
        fireEvent.press(screen.getByText(translate("nfts")));
        expect(screen.getAllByText(translate("nfts"))).toHaveLength(1);
    });
});