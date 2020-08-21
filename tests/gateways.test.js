const request = require("supertest");
const app = require("../server");
const Gateway = require("../api/models/gateway");

beforeEach(async () => {
  await Gateway.deleteMany({});
});

test("should create a new gateway", async () => {
  const res = await request(app).post("/gateways").send({
    serial_number: "44-4585",
    name: "Gateway 1",
    ip: "10.10.10.12",
  });

  expect(res.statusCode).toEqual(201);
  expect(res.body).toHaveProperty("message");
  expect(res.body).toHaveProperty("createdGateway");
});
