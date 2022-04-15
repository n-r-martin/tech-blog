const User = require('./User');
const BlogEntry = require('./BlogEntry');
const Comment = require('./Comment');



User.hasMany(BlogEntry, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
})

User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
})

BlogEntry.belongsTo(User, {
  foreignKey: 'user_id'
});

BlogEntry.hasMany(Comment, {
  foreignKey: 'entry_id',
  onDelete: 'CASCADE'
})

Comment.belongsTo(BlogEntry, {
  foreignKey: 'entry_id'
})

Comment.belongsTo(User, {
  foreignKey: 'user_id'
})



module.exports = { User, BlogEntry, Comment };
