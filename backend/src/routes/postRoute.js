const postController = require("../controllers/postController");
const router = require("express").Router();

router.post("/create", postController.createPost);
router.get("/user/post/:slug", postController.getSinglePostFromUser);
router.post("/like", postController.likePost);
router.post("/unlike", postController.unlikePost);
router.post("/comment", postController.commentOnPost);
router.post("/upload-image", postController.uploadImage);
router.get("/:username/:slug", postController.getSinglePostFromUser);
router.get("/username", postController.getUsernameFromJwt);
router.post("view", postController.viewPost);

module.exports = router;
