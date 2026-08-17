// import multer from "multer";

// const storage = multer.diskStorage({
//     // destination where is file going to be saved
//     destination: function (req, file, cb) {
//         cb(null, "./public");
//     },
// // name of file that is going to be saved
//     filename: function (req, file, cb) {
//         cb(null, file.originalname + "-" + Date.now() );
//     },
// });


// export const upload = multer({ storage });
// export default upload;
// middlewares/multer.js
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const baseName = path.basename(file.originalname, ext);
    cb(null, `${baseName}-${Date.now()}${ext}`);
  },
});

export const upload = multer({ storage });
export default upload;