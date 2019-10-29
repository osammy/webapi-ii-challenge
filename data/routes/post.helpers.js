const Posts = require("../db.js");

const validateText = (req, res) => {
  if (!req.body.text) {
    return res
      .status(400)
      .json({ errorMessage: "Please provide text for the comment." });
  }
};
const validateBody = (req, res) => {
  const { title, contents } = req.body;

  if (!title || !contents) {
    return res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
  }
};

const verifyPost = (req, res, next) => {
  Posts.findById(req.params.id)
    .then(post => {
      if (!post || post.length === 0) {
        return res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
      next();
    })
    .catch(error => {
      // log error to database
      console.log(error);
      return res
        .status(500)
        .json({ error: "The post information could not be retrieved." });
    });
};

const getPosts = (req, res) => {
  Posts.find(req.query)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: "Error retrieving the posts"
      });
    });
};

const createPost = (req, res) => {
  validateBody(req, res);

  Posts.insert(req.body)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        error: "There was an error while saving the post to the database"
      });
    });
};

const getOnePost = (req, res) => {
  Posts.findById(req.params.id)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res
        .status(500)
        .json({ error: "The post information could not be retrieved." });
    });
};

// const deletePost = (req, res) => {
//   Posts.remove(req.params.id)
//     .then(count => {
//       if (count > 0) {
//         res.status(200).json({ message: "The post has been nuked" });
//       } else {
//         res.status(404).json({ message: "The post could not be found" });
//       }
//     })
//     .catch(error => {
//       // log error to database
//       console.log(error);
//       res.status(500).json({
//         message: "Error removing the post"
//       });
//     });
// };

const updatePost = (req, res) => {
  validateBody(req, res);
  const changes = req.body;

  Posts.update(req.params.id, changes)
    .then(post => {
      if(post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: "The post could not be found" });
      }
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res
        .status(500)
        .json({ error: "The post information could not be modified." });
    });
};

const deletePost = (req, res) => {
  Posts.remove(req.params.id)
    .then(() => {
      res.status(200).json({ message: "delete succesful!" });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: "The post could not be removed" });
    });
};

const postComment = (req, res) => {
  //find post

  validateText(req.body.text);

  Posts.insertComment({ text: req.body.text, post_id: req.params.id })
    .then(id => {
      req.body.id = id;
      res.status(200).json(req.body);
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: "Error retrieving the post"
      });
    });
};

const getPostComments = (req, res) => {
  //find post
  Posts.findPostComments(req.params.id)
    .then(comments => {
      res.status(200).json(comments);
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        error: "The comments information could not be retrieved."
      });
    });
};

module.exports = {
  getPosts,
  createPost,
  getOnePost,
  deletePost,
  updatePost,
  verifyPost,
  postComment,
  getPostComments
};
