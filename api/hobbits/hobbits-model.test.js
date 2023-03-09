test("test environment testing olarak ayarlı", () => {
  expect(process.env.NODE_ENV).toBe("test");
});
