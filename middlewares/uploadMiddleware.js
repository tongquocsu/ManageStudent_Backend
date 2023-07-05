import multer from "multer";
import cloudinary from "cloudinary";
import configureCloudinary from "../config/cloudinary.js";

configureCloudinary();

// Cấu hình multer storage
const storage = multer.diskStorage({});

// Xử lý upload file với multer
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    // Kiểm tra kiểu file (chỉ chấp nhận ảnh)
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only images are allowed."));
    }
  },
});

// Middleware upload ảnh
const uploadImage = (req, res, next) => {
  upload.single("image")(req, res, async (error) => {
    if (error) {
      res.status(400).send({
        success: false,
        message: error.message,
      });
    } else {
      try {
        // Upload ảnh lên Cloudinary
        const imageUploadResult = await cloudinary.uploader.upload(
          req.file.path
        );

        // Lưu đường dẫn ảnh vào trường "image" của req.body
        req.body.image = imageUploadResult.secure_url;

        next();
      } catch (error) {
        res.status(500).send({
          success: false,
          error,
          message: "Error uploading image",
        });
      }
    }
  });
};

export default uploadImage;
