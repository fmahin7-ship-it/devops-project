const request = require("supertest");
const fs = require("fs");
const path = require("path");

const app = require("../app");

const filePath = path.join(__dirname, "../data/products.json");



// Reset test data before every test
const originalProducts = [
  {
    id: 1,
    name: "Laptop",
    price: 1200,
    category: "Electronics",
    stock: 10
  },
  {
    id: 2,
    name: "Phone",
    price: 800,
    category: "Electronics",
    stock: 15
  },
  {
    id: 3,
    name: "Headphones",
    price: 150,
    category: "Accessories",
    stock: 25
  },
  {
    id: 4,
    name: "Keyboard",
    price: 100,
    category: "Accessories",
    stock: 12
  }
];



beforeEach(() => {
  fs.writeFileSync(
    filePath,
    JSON.stringify(originalProducts, null, 2)
  );
});



describe("Products API", () => {

  // GET all products
  test("GET /products", async () => {
    const response = await request(app).get("/products");

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(4);
  });




  // GET single product
  test("GET /products/1", async () => {
    const response = await request(app)
      .get("/products/1");

    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe("Laptop");
  });




  // POST product
  test("POST /products", async () => {
    const response = await request(app)
      .post("/products")
      .send({
        name: "Smart Watch",
        price: 300,
        category: "Wearable",
        stock: 7
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.name).toBe("Smart Watch");
  });




  // PUT product
  test("PUT /products/1", async () => {
    const response = await request(app)
      .put("/products/1")
      .send({
        name: "Gaming Laptop",
        price: 2000,
        category: "Electronics",
        stock: 5
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe(
      "Gaming Laptop"
    );
  });




  // DELETE product
  test("DELETE /products/1", async () => {
    const response = await request(app)
      .delete("/products/1");

    expect(response.statusCode).toBe(200);

    expect(response.body.message).toBe(
      "Product deleted successfully"
    );
  });

});