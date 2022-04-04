import { render } from "test-utils";
import TransactionCard from "module/transaction/component/display/TransactionCard/TransactionCard";
import { transaction } from "mocks/transaction";
import { translate } from "locale";

describe("TransactionCard tests", () => {
    test("Renders correctly", () => {
        const screen = render(<TransactionCard transaction={transaction} />);
        expect(screen.getByText("29/01/2022 - 00:00")).toBeDefined();
        expect(screen.getByText(translate("sent"))).toBeDefined();
        expect(screen.getByText("CKB")).toBeDefined();
        expect(screen.getByTestId("SendIcon")).toBeDefined();
    });
});
