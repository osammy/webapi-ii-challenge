const express = require("express");
const helpers = require("./post.helpers")

const router = express.Router();
//base route
router.route('/')
.get(helpers.getPosts)
.post(helpers.createPost)


router.route("/:id")
.get(helpers.getOnePost)
.put(helpers.verifyPost,helpers.updatePost)
.delete(helpers.verifyPost,helpers.deletePost)

//comments
router.route("/:id/comments")
.post(helpers.verifyPost,helpers.postComment)
.get(helpers.verifyPost,helpers.getPostComments)

module.exports = router;
