import multer from "multer";

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        // We store uploaded files in the public folder.
        cb(null, "../storage");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
})

const upload = multer({ storage: fileStorageEngine });

export default upload;

/**
 * REFERENCES:
 * - https://www.youtube.com/watch?v=EVOFt8Its6I
 * - https://www.youtube.com/watch?v=wIOpe8S2Mk8
 */