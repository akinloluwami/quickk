const postController = require("../controllers/postController");
const router = require("express").Router();

router.post("/create", postController.createPost);
router.get("/user/posts", postController.getPostsFromUser);
router.get("/user/post/:slug", postController.getSinglePostFromUser);

module.exports = router;
