const router = require("express").Router();

const charactersDB = require("../helpers/charactersModel");

// GET characters

router.get("/", (req, res) => {
  charactersDB
    .get()
    .then(characters => {
      res.status(200).json(characters);
    })
    .catch(err => {
      res.status(500).json({ error: `There was an error: ${err}` });
    });
});

// GET character by :id

router.get("/:id", (req, res) => {
  const { id } = req.params;
  charactersDB
    .get(id)
    .then(character => {
      res.status(200).json(character);
    })
    .catch(err => {
      res.status(500).json({ error: `There was an error: ${err}` });
    });
});

// POST character

router.post("/", (req, res) => {
  const newCharacter = req.body;
  charactersDB
    .insert(newCharacter)
    .then(newCharacter => {
      res.status(201).json(newCharacter);
    })
    .catch(err => {
      res.status(500).json({ error: `There was an error ${err}` });
    });
});

// DELETE by :id
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  charactersDB
    .remove(id)
    .then(deleteCharacter => {
      res.status(200).json(deleteCharacter);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: `There was an error: ${err}` });
    });
});

// PUT by :id
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const updateCharacter = req.body;
  charactersDB
    .update(id, updateCharacter)
    .then(updateCharacter => {
      res.status(200).json(updateCharacter);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: `Error: ${err}` });
    });
});

module.exports = router;
