const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

// // Configure the storage for uploaded files
// const storage = multer.memoryStorage(); // In-memory storage

// // Configure the file filter to allow only JPEG and PNG image files
// const fileFilter = (req, file, cb) => {
//   const allowedMimeTypes = ['image/jpeg', 'image/png'];
//   if (allowedMimeTypes.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(new Error('Only JPEG and PNG image files are allowed.'), false);
//   }
// };


// // Configure Multer instance
// const upload = multer({
//   storage,
//   fileFilter,
//   limits: {
//     fileSize: 5 * 1024 * 1024, // Maximum file size in bytes (e.g., 5MB)
//   },
// });

module.exports = upload;
