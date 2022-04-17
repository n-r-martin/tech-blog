const router = require("express").Router();
const { User, BlogEntry, Comment } = require("../models");

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
      title: 'Tech Blog'
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

router.get("/create-entry", async (req, res) => {
  try {
    if (req.session.logged_in) {
      const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
      });

      const user = userData.get({ plain: true });
  
      res.render('createentry', {
        ...user,
        logged_in: req.session.logged_in,
        title: "Create New Entry"
      });
    } else {
      res.status(200).redirect("login")
    }
   
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/login', async (req, res) => {
  try {

  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }
  
  else {
    res.render('login', { 
      title: "Tech Blog" 
    });
  }

  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/signup', async (req, res) => {
  try {

    if (req.session.logged_in) {
      res.redirect('/dashboard');
      return;
    }
    
    else {
      res.render('signup', { 
        title: "Tech Blog" 
      });
    }
  
    } catch (err) {
      res.status(500).json(err);
    }
  });

router.get('/entries/:id', async (req, res) => {
  try {
    // Get all projects with user data
    const entryData = await BlogEntry.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Comment,
          attributes: ['body', 'user_id', 'date_created'],
          include: [
            {
              model: User,
              attributes: ['username'],
            },
          ]
        },
      ],
    });
    let user;
    if (req.session.logged_in) {
      const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
      });
      user = userData.get({ plain: true });
    }; 
    // Serialize data so the template can read it
    const entries = entryData.get({ plain: true });
    let commentAry = [];
    commentAry.push(entries.comments);
    // Pass data to view
    res.render('singleentry', { 
      ...user,
      entries,
      commentAry, 
      logged_in: req.session.logged_in,
      title: "Tech Blog"
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;


