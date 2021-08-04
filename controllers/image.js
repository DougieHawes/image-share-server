const formidable = require("formidable");
const fs = require("fs");

const Image = require("../models/image");

exports.getImages = async (req, res) => {
  try {
    const images = await Image.find().sort({ date: -1 });
    res.json(images);
  } catch (err) {
    res.status(500).send("server error");
  }
};

exports.postImage = async (req, res) => {
  const form = formidable({ multiples: true });

  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }

    const newImage = new Image(fields);

    if (files.photo) {
      if (files.photo.size > 1000000) {
        return res.status(400).json({
          error: "Image should be less than 1mb in size",
        });
      }
      newImage.photo.data = fs.readFileSync(files.photo.path);
      newImage.photo.contentType = files.photo.type;
    }

    newImage.save((err, result) => {
      if (err) {
        console.log("ERROR-", err);
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json(result);
    });
  });
};

exports.photo = (req, res, next) => {
  if (req.image.photo.data) {
    res.set("Content-Type", req.image.photo.contentType);
    return res.send(req.image.photo.data);
  }
  next();
};

exports.imageById = (req, res, next, id) => {
  Image.findById(id).exec((err, image) => {
    if (err || !image) {
      return res.status(400).json({
        error: "image not found",
      });
    }
    req.image = image;
    next();
  });
};
