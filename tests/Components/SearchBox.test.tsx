import { render, screen } from "@testing-library/react";
import SearchBox from "../../src/components/SearchBox";
import userEvent from "@testing-library/user-event";

describe("SearchBox", () => {
  const renderSearchBox = () => {
    const onChange = vi.fn();

    render(<SearchBox onChange={onChange} />);

    return {
      input: screen.getByPlaceholderText(/search/i),
      user: userEvent.setup(),
      onChange,
    };
  };

  it("Should render an input field", () => {
    const { input } = renderSearchBox();

    expect(input).toBeInTheDocument();
  });

  it("Should call onChange when Enter is pressed", async () => {
    const { input, onChange, user } = renderSearchBox();

    const searchTerm = "hello world";
    await user.type(input, searchTerm + "{enter}");

    expect(onChange).toHaveBeenCalledWith(searchTerm);
  });

  it("Should not call onChange when input is empty", async () => {
    const { input, onChange, user } = renderSearchBox();

    await user.type(input, "{enter}");

    expect(onChange).not.toHaveBeenCalled();
  });
});
