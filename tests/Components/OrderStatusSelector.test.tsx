import { render, screen } from "@testing-library/react";
import OrderStatusSelector from "../../src/components/OrderStatusSelector";
import { Theme } from "@radix-ui/themes";
import userEvent from "@testing-library/user-event";

describe("OrderStatusSelector", () => {
  const renderComponent = () => {
    const onChange = vi.fn();

    render(
      <Theme>
        <OrderStatusSelector onChange={onChange} />
      </Theme>
    );

    return {
      trigger: screen.getByRole("combobox"),
      getOptions: () => screen.findAllByRole("option"),
    };
  };

  it("Should render New as the initial text", () => {
    const { trigger } = renderComponent();

    expect(trigger).toHaveTextContent(/new/i);
  });

  it("Should display other options when button is clicked", async () => {
    const user = userEvent.setup();

    const { trigger, getOptions } = renderComponent();

    await user.click(trigger);

    const options = await getOptions();
    expect(options.length).toEqual(3);

    const labels = options.map((option) => option.textContent);
    expect(labels).toStrictEqual(["New", "Processed", "Fulfilled"]);
  });
});
