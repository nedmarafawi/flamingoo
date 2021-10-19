const express = require('express');
const mongoose = require('mongoose');
const app = express();
const dotenv = require('dotenv');
const authRoute = require('./routes/auth');
const pinRoute = require('./routes/pins');
const userRoute = require('./routes/users');
const postRoute = require('./routes/posts');
// const categoryRoute = require('./routes/categories');
const multer = require('multer');
const path = require('path');

var cors = require('cors');
const { MONGO_URL } = process.env;

dotenv.config();

app.use('/images', express.static(path.join(__dirname, '/images')));

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose
  .connect(process.env.MONGO_URL, options)
  .then(() => {
    console.log('MongoDB Connected!');
  })
  .catch((err) => console.log(err));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    // cb(null, 'wave.png');
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post('/api/upload', upload.single('file'), (req, res) => {
  res.status(200).json('File has been uploaded');
});

//  middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());

/*
 ********************************
 */
app.use('/api/auth', authRoute);
app.use('/api/pins', pinRoute);
app.use('/api/users', userRoute);
app.use('/api/posts', postRoute);
// app.use('/api/categories', categoryRoute);

/*
 **********************************
 */

app.listen(8800, () => {
  console.log('listening on port 8800');
});
