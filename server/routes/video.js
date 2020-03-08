const express = require("express");
const router = express.Router();
const multer = require("multer");

// const { video } = require("../models/video");
const { auth } = require("../middleware/auth");

var storage = multer.diskStorage({
   destination: (req, file, cb) => {
      cb(null, "uploads/");
   },
   filename: (req, file, cb) => {
      cb(null, `${Date.now()}_${file.originalname}`);
   },
   fileFilter: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      if (ext !== ".mp4") {
         return cb(res.status(400).end("only jpg, png, mp4 is allowed"), false);
      }
      cb(null, true);
   }
});

var upload = multer({ storage: storage }).single("file");

//=================================
//             Video
//=================================

router.post("/uploadfiles", (req, res) => {
   // 비디오를 서버에 저장한다.
   upload(req, res, err => {
      if (!err) {
         return res.json({ success: true, filePath: res.req.file.path, fileName: res.req.file.filename });
      } else {
         return res.json({ success: false, err });
      }
   });
});

module.exports = router;
