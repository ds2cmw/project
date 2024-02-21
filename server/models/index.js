const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');

const User = require('./user');
const Comment = require('./comment');
const Post = require('./post');
const Hashtag = require('./hashtag');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = User;
db.Comment = Comment;
db.Post = Post;
db.Hashtag = Hashtag;

User.initiate(sequelize);
Comment.initiate(sequelize);
Post.initiate(sequelize);
Hashtag.initiate(sequelize);

User.associate(db);
Comment.associate(db);
Post.associate(db);
Hashtag.associate(db);

module.exports = db;