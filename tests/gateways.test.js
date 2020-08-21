const request = require("supertest");
const app = require("../server");

const Gateway = require("../api/models/gateway");
const Device = require("../api/models/device");

beforeEach(async () => {
  await Gateway.deleteMany({});
  await Device.deleteMany({});
});

test("Should create a new gateway", async () => {
  const res = await request(app).post("/gateways").send({
    serial_number: "44-4585",
    name: "Gateway 1",
    ip: "10.10.10.12",
  });

  expect(res.statusCode).toEqual(201);
  expect(res.body).toHaveProperty("message");
  expect(res.body).toHaveProperty("createdGateway");
});

test("Serial Number should be unique", async () => {
  const gatewayData = {
    serial_number: "44-4588",
    name: "Gateway 1",
    ip: "10.10.10.12",
  };

  Gateway(gatewayData).save();

  const res = await request(app).post("/gateways").send({
    serial_number: "44-4588",
    name: "Gateway 1",
    ip: "10.10.10.12",
  });

  expect(res.statusCode).toEqual(500);
});

test("Ip should be a ipv4 address", async () => {
  const res = await request(app).post("/gateways").send({
    serial_number: "44-4587",
    name: "Gateway 1",
    ip: "1210.10.10.12",
  });

  expect(res.statusCode).toEqual(422);
});

test("Gateways list can be great than cero", async () => {
  const res = await request(app).post("/gateways").send({
    serial_number: "44-4589",
    name: "Gateway 2",
    ip: "10.10.10.12",
  });

  const res1 = await request(app).get("/gateways").send();

  expect(res1.statusCode).toEqual(201);
  expect(res1.body).toHaveProperty("count");
  expect(res1.body).toHaveProperty("orders");
  expect(1).toBe(res1.body.count);
});

test("Should add a new device to Gateway", async () => {
  const gatewayData = {
    serial_number: "44-4590",
    name: "Gateway 1",
    ip: "10.10.10.12",
  };

  Gateway(gatewayData)
    .save()
    .then(async (gateway) => {
      const res = await request(app)
        .post("/gateways/" + gateway._id)
        .send({
          vendor: "Vendor 5",
          status: "true",
        });

      expect(res.statusCode).toEqual(201);
      expect("Device added to Gateway").toBe(res.body.message);
      expect(res.body).toHaveProperty("gateway");
    });
});

test("Gateway only Should have 10 devices", async () => {
  const gatewayData = {
    serial_number: "44-4591",
    name: "Gateway 1",
    ip: "10.10.10.12",
  };

  Gateway(gatewayData)
    .save()
    .then(async (gateway) => {
      for (let index = 1; index <= 10; index++) {
        const res = await request(app)
          .post("/gateways/" + gateway._id)
          .send({
            vendor: "Vendor " + index,
            status: index % 2 === 0 ? true : false,
          });
      }

      const res = await request(app)
        .post("/gateways/" + gateway._id)
        .send({
          vendor: "Vendor 11",
          status: false,
        });

      expect(res.statusCode).toEqual(422);
      expect(
        "No more that 10 peripheral devices are allowed for a gateway."
      ).toBe(res.body.message);
    });
});
