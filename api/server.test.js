const request = require("supertest");
const server = require("./server");
const db = require("../data/dbConfig");

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

beforeEach(async () => {
  await db.seed.run();
});

afterAll(async () => {
  await db.destroy();
});

describe("API END POINT TESTLERI", () => {
  describe("[GET] /", () => {
    test("[1] up mesajı dönüyor", async () => {
      const res = await request(server).get("/");
      expect(res.body).toEqual({ message: "up" });
      expect(res.status).toBe(200);
    });
  });
  describe("[GET] /api/hobbits", () => {
    test("[2] tüm hobbitleri dönüyor", async () => {
      const res = await request(server).get("/api/hobbits");
      expect(res.body).toHaveLength(4);
      expect(res.body[0]).toHaveProperty("name", "sam");
    });
  });

  describe("[POST] /api/hobbits", () => {
    test("[3] yeni hobbit başarılı oluşturuluyor", async () => {
      const newHobbit = { name: "yigit" };
      const res = await request(server).post("/api/hobbits").send(newHobbit);
      expect(res.status).toBe(200);
    });
  });
  test("[4] yeni hobbit'i dönüyor", async () => {
    const newHobbit = { name: "yigit" };
    const res = await request(server).post("/api/hobbits").send(newHobbit);
    expect(res.body).toEqual({ id: 5, name: "yigit" });
  });
  describe("[GET] /api/hobbits/:id", () => {
    test("[5] istenen id'li hobbiti dönüyor", async () => {
      const res = await request(server).get("/api/hobbits/1");
      expect(res.body).toBeDefined();
      expect(res.body).toEqual({ id: 1, name: "sam" });
    });
  });
});
