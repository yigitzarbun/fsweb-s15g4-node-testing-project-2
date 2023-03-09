const db = require("./../../data/dbConfig");

async function getAll() {
  const hobbits = await db("hobbits");
  return hobbits;
}

async function getById(id) {
  const hobbit = await db("hobbits").where("id", id).first();
  return hobbit;
}

async function insert(hobbit) {
  const newHobbitIdArray = await db("hobbits").insert(hobbit);
  const newHobbitId = newHobbitIdArray[0];
  const newHobbit = await db("hobbits").where("id", newHobbitId).first();
  return newHobbit;
}

module.exports = { getAll, getById, insert };
