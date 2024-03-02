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
      user: userEvent.setup(),
      onChange,
    };
  };

  it("Should render New as the initial text", () => {
    const { trigger } = renderComponent();

    expect(trigger).toHaveTextContent(/new/i);
  });

  it("Should display other options when button is clicked", async () => {
    const { trigger, user, getOptions } = renderComponent();

    await user.click(trigger);

    const options = await getOptions();
    expect(options.length).toEqual(3);

    const labels = options.map((option) => option.textContent);
    expect(labels).toStrictEqual(["New", "Processed", "Fulfilled"]);
  });

  it("Should call the callBack with the processed option", async () => {
    const { trigger, user, onChange } = renderComponent();

    await user.click(trigger);

    const processedOption = screen.getByRole("option", { name: /processed/i });
    await user.click(processedOption);

    expect(onChange).toHaveBeenCalledWith("processed");
  });

  it("Should call the callBack with the fulfilled option", async () => {
    const { trigger, user, onChange } = renderComponent();

    await user.click(trigger);

    const fulfilledOption = screen.getByRole("option", { name: /fulfilled/i });
    await user.click(fulfilledOption);

    expect(onChange).toHaveBeenCalledWith("fulfilled");
  });

  it("Should call the callBack with the new option", async () => {
    const { trigger, user, onChange } = renderComponent();

    await user.click(trigger);

    const fulfilledOption = screen.getByRole("option", { name: /fulfilled/i });
    await user.click(fulfilledOption);

    await user.click(trigger);
    const newOption = screen.getByRole("option", { name: /new/i });
    await user.click(newOption);

    expect(onChange).toHaveBeenCalledWith("new");
  });
});
