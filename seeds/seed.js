const sequelize = require('../config/connection');
const { User, BlogEntry, Comment } = require('../models');


const userData = require('./userData.json'); 
const blogEntryData = require('./blogEntryData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
      });

    await BlogEntry.bulkCreate(blogEntryData);

    await Comment.bulkCreate(commentData);

    process.exit(0);
};

seedDatabase();
