const express = require("express");
const router = express.Router();
const hobbitsModel = require("./hobbits-model");

router.get("/", (req, res, next) => {
  hobbitsModel
    .getAll()
    .then((hobbits) => {
      res.status(200).json(hobbits);
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  hobbitsModel
    .getById(id)
    .then((hobbit) => {
      res.status(200).json(hobbit);
    })
    .catch((err) => next(err));
});

router.post("/", (req, res, next) => {
  hobbitsModel
    .insert(req.body)
    .then((hobbit) => res.status(200).json(hobbit))
    .catch((err) => next(err));
});

module.exports = router;
