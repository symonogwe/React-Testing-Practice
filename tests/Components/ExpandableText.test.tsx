import { render, screen } from "@testing-library/react";
import ExpandableText from "../../src/components/ExpandableText";
import userEvent from "@testing-library/user-event";

describe("ExpandableText", () => {
  const limit = 255;
  const longText = "a".repeat(limit + 1);
  const truncatedText = longText.slice(0, 255) + "...";

  it("should render short text", () => {
    const text = "hello world";
    render(<ExpandableText text={text} />);

    expect(screen.getByText(text)).toBeInTheDocument();
  });

  it("Should show truncated text if it is more than the limit", () => {
    render(<ExpandableText text={longText} />);

    const shortText = screen.getByText(truncatedText);
    expect(shortText).toBeInTheDocument();

    const showMoreBtn = screen.getByRole("button", { name: /more/i });
    expect(showMoreBtn).toBeInTheDocument();
  });

  it("Should show long text if show more button is clicked", async () => {
    const user = userEvent.setup();

    render(<ExpandableText text={longText} />);

    const showMoreBtn = screen.getByRole("button", { name: /more/i });
    await user.click(showMoreBtn);
    expect(screen.getByText(longText)).toBeInTheDocument();

    const showLessBtn = screen.getByRole("button", { name: /less/i });
    expect(showLessBtn).toBeInTheDocument();
  });

  it("Should show truncated text if show less button is clicked", async () => {
    const user = userEvent.setup();

    render(<ExpandableText text={longText} />);

    const showMoreBtn = screen.getByRole("button", { name: /more/i });
    await user.click(showMoreBtn);

    const showLessBtn = screen.getByRole("button", { name: /less/i });
    await user.click(showLessBtn);

    expect(screen.getByText(truncatedText)).toBeInTheDocument();
  });
});
