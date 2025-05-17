const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname);
  if (['.csv', '.xls', '.xlsx'].includes(ext)) cb(null, true);
  else cb(new Error('Only CSV, XLS, XLSX files allowed'), false);
};

module.exports = multer({ storage, fileFilter });
