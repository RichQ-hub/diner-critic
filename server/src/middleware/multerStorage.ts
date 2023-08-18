import multer from "multer";

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "../client/src/assets/storage");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
})

const upload = multer({ storage: fileStorageEngine });

export default upload;

/**
 * IMPORTANT NOTE:
 * We store restaurant images in the client assets folder, since we cannot use
 * the dynamic import() function to import images outside of the client/src
 * folder.
 */

/**
 * REFERENCES:
 * - https://www.youtube.com/watch?v=EVOFt8Its6I
 * - https://www.youtube.com/watch?v=wIOpe8S2Mk8
 */