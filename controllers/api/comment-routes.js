const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
    try {
        const commentData = await Comment.findAll();
        res.status(200).json(commentData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/', withAuth, async (req, res) => {
  try {
      const commentData = await Comment.create({
        user_id: req.session.user_id,
        body: req.body.newComment,
        entry_id: req.body.entryId
      });

      res.status(200).json(commentData);
} catch (err) {
  res.status(400).json(err);
}
});

module.exports = router;
