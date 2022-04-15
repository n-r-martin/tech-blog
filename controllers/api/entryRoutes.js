const router = require('express').Router();
const { BlogEntry } = require('../../models');

router.get('/', async (req, res) => {
    try {
        const entryData = await BlogEntry.findAll();
        res.status(200).json(entryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
