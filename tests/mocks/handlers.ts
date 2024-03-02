import { HttpResponse, http } from "msw";

export const handlers = [
  http.get("/categories", () => {
    return HttpResponse.json([
      { id: 1, name: "Electronics" },
      { id: 2, name: "Beauty" },
      { id: 3, name: "Gardening" },
    ]);
  }),
  http.get("/products", () => {
    return HttpResponse.json([
      { id: 1, product: "product 1" },
      { id: 2, product: "product 2" },
      { id: 3, product: "product 3" },
    ]);
  }),
];
