const postController = require("../controllers/postController");
const router = require("express").Router();

router.post("/create", postController.createPost);
router.post("/edit", postController.editPost);
router.get("/user/post/:slug", postController.getSinglePostFromUser);
router.post("/like", postController.likePost);
router.post("/unlike", postController.unlikePost);
router.post("/comment", postController.commentOnPost);
router.post("/upload-image", postController.uploadImage);
router.get("/:username/:slug", postController.getSinglePostFromUser);
router.get("/username", postController.getUsernameFromJwt);
router.post("/view", postController.viewPost);
router.delete("/delete/:slug/:id", postController.deletePost);
module.exports = router;
