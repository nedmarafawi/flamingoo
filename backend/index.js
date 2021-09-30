const { cloudinary } = require('./utils/cloudinary');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const dotenv = require('dotenv');
const pinRoute = require('./routes/pins');
const userRoute = require('./routes/users');
var cors = require('cors');
const { MONGO_URL } = process.env;
const { MongoClient } = require('mongodb');

dotenv.config();
// console.log(process.env);
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB Connected!');
  })
  .catch((err) => console.log(err));

/*
 ********************************
 */
app.use('/api/pins', pinRoute);
app.use('/api/users', userRoute);

/* Upload Image */
app.post('/api/upload', async (req, res) => {
  // console.log('taco');
  const client = await new MongoClient(MONGO_URL, options);
  // console.log('smokey');
  try {
    await client.connect();
    let db = client.db('travelMap');

    const file = req.body.data;
    const result = await db.collection('files').insertOne(file);
    console.log(result);

    res.json({ msg: 'File uploaded successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: 'Something went wrong' });
  }
});

/* 

cloudinary.v2.search
  .expression('resource_type:image AND tags=kitten AND uploaded_at>1d AND bytes>1m')
  .sort_by('public_id','desc')
  .max_results(30)
  .execute().then(result=>console.log(result));

*/

/* Load Images */
// app.get('/api/profile', async (req, res) => {
//   console.log('taco');
//   const { resources } = await cloudinary.search
//     // const resources = await cloudinary.v2.search
//     .expression('folder:travel_app')
//     .sort_by('public_id', 'desc')
//     // .sort_by('public_id')
//     .max_results(30)
//     .execute();

//   const publicIds = resources.map((file) => file.public_id);
//   res.send(publicIds);
// });

// app.post('/api/upload', async (req, res) => {
//   console.log('taco');
//   try {
//     const fileStr = req.body.data;
//     const uploadResponse = await cloudinary.uploader.upload('test.png', {
//       upload_preset: 'travel_app',
//     });
//     console.log(uploadResponse);
//     res.json({ msg: 'File uploaded successfully' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ err: 'Something went wrong' });
//   }
// });

/*
 **********************************
 */

app.listen(8800, () => {
  console.log('listening on port 8800');
});
