import { render, screen } from "@testing-library/react";
import { User } from "../../src/entities";
import UserList from "../../src/components/UserList";

describe("UserList", () => {
  it("should render a paragraph if there are no users", () => {
    const users: User[] = [];
    render(<UserList users={users} />);
    expect(screen.getByText(/no users/i)).toBeInTheDocument();
  });
  it("should render a link for each user", () => {
    const users: User[] = [
      { id: 1, name: "Symon" },
      { id: 2, name: "Ogwe" },
    ];
    render(<UserList users={users} />);
    users.forEach((user) => {
      const link = screen.getByRole("link", { name: user.name });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", `/users/${user.id}`);
    });
  });
});
