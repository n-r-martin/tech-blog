const router = require('express').Router();
const { BlogEntry } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
    try {
        const entryData = await BlogEntry.findAll();
        res.status(200).json(entryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/', withAuth, async (req, res) => {
  try {
      const entryData = await BlogEntry.create({
        title: req.body.entryTitle,
        body: req.body.entryBody,
        user_id: req.session.user_id
      });

      res.status(200).json(entryData);
} catch (err) {
  res.status(400).json(err);
}
});

module.exports = router;
