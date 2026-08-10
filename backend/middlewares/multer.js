import multer from "multer";

const storage = multer.diskStorage({
    // destination where is file going to be saved
    destination: function (req, file, cb) {
        cb(null, "/public");
    },
// name of file that is going to be saved
    filename: function (req, file, cb) {
        cb(null, file.originalname + "-" + Date.now() );
    },
});


export const upload = multer({ storage: storage });