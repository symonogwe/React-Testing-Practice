import { render, screen } from "@testing-library/react";
import ProductDetail from "../../src/components/ProductDetail";
import { products } from "../mocks/data";
import { server } from "../mocks/server";
import { HttpResponse, http } from "msw";

describe("ProductDetail", () => {
  it("Should render the list of products", async () => {
    render(<ProductDetail productId={1} />);

    expect(
      await screen.findByText(new RegExp(products[0].name))
    ).toBeInTheDocument();
    expect(
      await screen.findByText(new RegExp(products[0].price.toString()))
    ).toBeInTheDocument();
  });

  it("should render message if product is not found", async () => {
    server.use(http.get("/products/1", () => HttpResponse.json(null)));

    render(<ProductDetail productId={1} />);

    const message = await screen.findByText(/not found/i);
    expect(message).toBeInTheDocument();
  });

  it("should show error on invalid product id", async () => {
    render(<ProductDetail productId={0} />);

    const errorMessage = await screen.findByText(/invalid/i);
    expect(errorMessage).toBeInTheDocument();
  });
});
