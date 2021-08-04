const router = require("express").Router();

const {
  imageById,
  getImages,
  postImage,
  photo,
} = require("../controllers/image");

router.get("/", getImages);
router.post("/post", postImage);
router.get("/photo/:id", photo);

router.param("id", imageById);

module.exports = router;
