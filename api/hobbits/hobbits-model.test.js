const db = require("./../../data/dbConfig");
const hobbitsModel = require("./hobbits-model");

test("test environment testing olarak ayarlı", () => {
  expect(process.env.NODE_ENV).toBe("testing");
});

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

beforeEach(async () => {
  await db.seed.run();
});

describe("getAll", () => {
  test("[1] tüm hobbitler geliyor mu", async () => {
    const hobbits = await hobbitsModel.getAll();
    expect(hobbits).toBeDefined();
    expect(hobbits).toHaveLength(4);
    expect(hobbits[0]).toHaveProperty("name", "sam");
  });
});

describe("getById", () => {
  test("[2] istenen formatta dönüyor", async () => {
    const hobbit = await hobbitsModel.getById(1);
    expect(hobbit).toBeDefined();
    expect(hobbit).toMatchObject({ name: "sam" });
    expect(hobbit).toHaveProperty("name", "sam");
  });
  test("[3] kayıtlı olamyanı dönmüyor", async () => {
    const hobbit = await hobbitsModel.getById(999);
    expect(hobbit).not.toBeDefined();
  });
});

describe("insert", () => {
  test("[4] eklenen hobiti doğru formatta döner", async () => {
    const newHobbit = await hobbitsModel.insert({ name: "yigit" });
    expect(newHobbit).toBeDefined();
    expect(newHobbit).toMatchObject({ name: "yigit" });
    expect(newHobbit).toHaveProperty("name", "yigit");
  });
  test("[5] hobbit başarıyla eklenir", async () => {
    await hobbitsModel.insert({ name: "yigit" });
    const hobbits = await db("hobbits");
    expect(hobbits).toHaveLength(5);
  });
});
