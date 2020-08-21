const request = require("supertest");
const app = require("../server");
const Device = require("../api/models/device");

beforeEach(async () => {
  await Device.deleteMany({});
});

test("Device should be delete", () => {
  const deviceData = {
    vendor: "Vendor 1",
    status: "true",
  };

  Device(deviceData)
    .save()
    .then(async (device) => {
      const res = await request(app)
        .delete("/devices/" + device._id)
        .send();

      expect(res.statusCode).toEqual(200);
    });
});

test("Device with id no real can not be delete", async () => {
  const res = await request(app).delete("/devices/123456789").send();

  expect(res.statusCode).toEqual(404);
  expect(res.body).toHaveProperty("message");
  expect(res.body.message).toBe("Device not found");
});
