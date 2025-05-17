const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/tmp/uploads'); // /tmp is writeable in Lambda
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
