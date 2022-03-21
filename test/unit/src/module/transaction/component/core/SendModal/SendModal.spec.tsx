import { render, SuccessApiCall } from "test-utils";
import SendModal from "module/transaction/component/core/SendModal/SendModal";
import * as UseWallet from "module/wallet/hook/useWallet";
import { cells } from "mocks/cells";
import { translate } from "locale";
import * as GetFee from "module/transaction/mock/getFee";
import * as Recoil from "recoil";
import { fireEvent } from "@testing-library/react-native";

describe("SendModal tests", () => {
    beforeAll(() => {
        jest.spyOn(UseWallet, "default").mockReturnValue({ state: { cells, selectedAccount: 0 } } as any);
        jest.spyOn(GetFee, "default").mockReturnValue(SuccessApiCall("10"));
    });

    test("Renders correctly", () => {
        const screen = render(<SendModal />);
        expect(screen.getByText(translate("send"))).toBeDefined();
    });

    test("Resets send state on close", () => {
        const handleClose = jest.fn();
        const resetSendState = jest.fn();
        jest.spyOn(Recoil, "useResetRecoilState").mockReturnValue(resetSendState);
        const screen = render(<SendModal onClose={handleClose} />);
        fireEvent.press(screen.getByTestId("BackIcon"));
        expect(resetSendState).toHaveBeenCalled();
        expect(handleClose).toHaveBeenCalled();
    });
});
