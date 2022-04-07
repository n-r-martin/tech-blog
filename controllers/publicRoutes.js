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
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/dashboard", async (req, res) => {
  try {
    res.status(200).render("dashboard");
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


