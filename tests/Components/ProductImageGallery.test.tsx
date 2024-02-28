import { render, screen } from "@testing-library/react";
import ProductImageGallery from "../../src/components/ProductImageGallery";

describe("ProductImageGallery", () => {
  it("Should render nothing if given an empty array", () => {
    const { container } = render(<ProductImageGallery imageUrls={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("Should render a list of images", () => {
    const imageUrls = ["url1", "url2"];
    render(<ProductImageGallery imageUrls={imageUrls} />);
    const allImages = screen.getAllByRole("img");
    expect(allImages.length).toBe(2);
    imageUrls.forEach((url, index) => {
      expect(allImages[index]).toHaveAttribute("src", url);
    });
  });
});
