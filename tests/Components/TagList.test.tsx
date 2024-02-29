import { render, screen } from "@testing-library/react";
import TagList from "../../src/components/TagList";

describe("TagList component", () => {
  it("Should render list items correctly", async () => {
    render(<TagList />);

    // await waitFor(() => {
    //   const listItems = screen.getAllByRole("listitem");
    //   expect(listItems.length).toBeGreaterThan(0);
    // });

    const listItems = screen.findAllByRole("listitem");
    expect((await listItems).length).toBeGreaterThan(0);
  });
});
