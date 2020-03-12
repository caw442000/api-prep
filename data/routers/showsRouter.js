const router = require("express").Router();

// const express = require('express')
// const router = express.Router();

const cors = require("cors");
const showsDB = require("../helpers/showsModel");

router.use(cors());
// router.use(express.json());

// routes

// GET  shows

router.get("/", (req, res) => {
  showsDB
    .get()
    .then(shows => {
      res.status(200).json(shows);
    })
    .catch(err => {
      res.status(500).json({
        errorMessage: "There is an error"
      });
    });
});

//not needed because the data doesn't come back correctly
// // GET show by /:id

  router.get("/:id", (req, res) => {
    showsDB
      .get(req.params.id)
      .then(show => {
        res.status(200).json(show);
      })
      .catch(err => {
        res.status(500).json({
          errorMessage: "There is an error"
        });
      });
  });

// GET shows character /:id
router.get('/:id/characters', (req, res) => {
  const { id } = req.params;
  showsDB.getShowsCharacters(id).then(characters => {
    res.status(200).json(characters)
  }).catch(err => {
    res.status(500).json({error: `There was an error: ${err}`})
  });
    
});


// POST
router.post("/", (req, res) => {
  showsDB
    .insert(req.body)
    .then(() => {
      res.status(201).json(req.body);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "There was an error" });
    });
});

// DELETE by /:id
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  showsDB
    .remove(id)
    .then(deleteShow => {
      res.status(200).json(deleteShow);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "There was an error" });
    });
});

// PUT / PATCH by /:id
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const updateShow = req.body;
  showsDB
    .update(id, updateShow)
    .then(updateShow => {
      res.status(200).json(updateShow)
    })
    .catch(err => {
      res.status(500).json({ errorMessage: `Error: ${err}` });
    });
});

module.exports = router;
