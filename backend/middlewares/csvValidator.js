const fs = require('fs');
const uploadDir = '/tmp/uploads';

// ensure upload folder exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});


const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname);
  if (['.csv', '.xls', '.xlsx'].includes(ext)) cb(null, true);
  else cb(new Error('Only CSV, XLS, XLSX files allowed'), false);
};

module.exports = multer({ storage, fileFilter });
