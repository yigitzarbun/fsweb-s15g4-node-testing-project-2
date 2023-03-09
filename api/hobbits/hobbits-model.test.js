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

describe("[1] getAll", () => {
  test("tüm hobbitler geliyor mu", async () => {
    const hobbits = await hobbitsModel.getAll();
    expect(hobbits).toBeDefined();
  });
});
