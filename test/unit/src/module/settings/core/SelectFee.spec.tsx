import SelectFee from "module/settings/components/core/SelectFee/SelectFee";
import { defaultSettingsState } from "module/settings/state/SettingsState";
import { fireEvent, render } from "test-utils";
import * as Recoil from "recoil";
import { translate } from "locale";
import { SettingsStorage } from "module/settings/SettingsStorage";

describe("Test for the SelectFee component", () => {
    test("Renders correctly", () => {
        const setSettingsState = jest.fn();
        const mockedRecoilState = [defaultSettingsState, setSettingsState];
        jest.spyOn(Recoil, "useRecoilState").mockReturnValue(mockedRecoilState as any);
        const screen = render(<SelectFee />);
        expect(screen.getAllByText(translate("modify_default_fee"))).toHaveLength(2);
        expect(screen.getByText(translate("slow"))).toBeDefined();
        expect(screen.getByText(translate("fast"))).toBeDefined();
        expect(screen.getAllByText(translate("average"))).toHaveLength(2);
    });
    test("Change the fee correctly", () => {
        jest.useFakeTimers();
        const setSettingsState = jest.fn();
        const mockedRecoilState = [defaultSettingsState, setSettingsState];
        jest.spyOn(Recoil, "useRecoilState").mockReturnValue(mockedRecoilState as any);
        const setSettingsStorage = jest.spyOn(SettingsStorage, "set").mockImplementation(() => new Promise((resolve) => resolve()));
        const screen = render(<SelectFee />);
        const item = screen.getByText(translate("fast"));
        fireEvent.press(item);
        jest.runAllTimers();
        expect(setSettingsStorage).toHaveBeenCalledWith({ fee: "fast" });
        expect(setSettingsState).toHaveBeenCalled();
        jest.useRealTimers();
    });
});
