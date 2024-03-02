import multer from "multer";
import { extname } from "path";

export const fileFilter = (req, file, cb) => {
  // Check if the file type is allowed
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // Accept the file
  } else {
    cb(
      new Error("Invalid file type. Only JPEG and PNG images are allowed."),
      false
    );
  }
};

export const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "image/"); // Destination folder for uploaded files
  },
  filename: (req, file, cb) => {
    // Use the current timestamp as the filename
    cb(null, Date.now() + extname(file.originalname));
  },
});

export const get_image = (req, res) => {
  const filename = req.query.img;
  console.log(req.params, "params");
  try {
    res.sendFile(`${process.cwd()}/image/${filename}`);
  } catch (e) {
    res.status(500).send({ err: e.message });
  }
};
