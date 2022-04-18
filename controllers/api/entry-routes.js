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

// Route for updating - data route only
router.put('/:id', withAuth, async (req, res) => {
  try {
    const entryData = await BlogEntry.update({
      title: req.body.entryTitle,
      body: req.body.entryBody
    },
    {
      where: {
        id: req.params.id,
      },
    });

    if (!entryData) {
      res.status(404).json({ message: 'No entry found with this id!' });
      return;
    }

    res.status(200).json(entryData)
  } catch (err) {
    res.status(500).json(err);
  }
});
 

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const entryData = await BlogEntry.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!entryData) {
      res.status(404).json({ message: 'No entry found with this id!' });
      return;
    }

    res.status(200).json(entryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
