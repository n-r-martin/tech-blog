const router = require("express").Router();
const { User, BlogEntry } = require("../models");

router.get("/", async (req, res) => {
  try {
    const blogEntryData = await BlogEntry.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    // Serialize data so the template can read it
    const blogEntries = blogEntryData.map((blogEntry) => blogEntry.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render("landingpage", {
      blogEntries,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get("/dashboard", async (req, res) => {
  try {
    if (req.session.logged_in) {
      const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
        include: [{ model: BlogEntry }],
      });

      const entryData = await BlogEntry.findAll({
        where: { user_id: req.session.user_id },
        include: [
          {
            model: User,
            attributes: ['username'],
          },
        ],
      });
  
      // Serialize data so the template can read it
      const entries = entryData.map((entry) => entry.get({ plain: true }));
  
      const user = userData.get({ plain: true });
  
      res.render('dashboard', {
        ...user,
        entries,
        logged_in: req.session.logged_in,
        title: "Your Dashboard"
      });
    } else {
      res.status(200).redirect("login")
    }
   
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get("/login", async (req, res) => {
  try {
    res.status(200).render("login");
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get("/signup", async (req, res) => {
  try {
    res.status(200).render("signup");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;


