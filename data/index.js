const Posts = require('./routes/post-routes');

const mainRouter = require('express').Router();

mainRouter.use('/api/posts',Posts);

module.exports = mainRouter;