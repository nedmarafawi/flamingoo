// const { cloudinary } = require('./utils/cloudinary');
// const router = require('express').Router();

// const dotenv = require('dotenv');
// dotenv.config();

// const cloudinary = require('cloudinary').v2;

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// cloudinary.config({
//   cloud_name: 'nedmarafawi',
//   api_key: '583329685187664',
//   api_secret: 'WjIh4ZhmUendhHfnwmRP0EbxS8',
//   secure: true,
// });

// router.post('/', async (req, res) => {
//   try {
//     const fileStr = req.body.data;
//     // console.log(fileStr);

//     const uploadResponse = await cloudinary.uploader.upload(fileStr, {
//       upload_preset: 'travel_app',
//       // timestamp: Math.round(Date.now() / 1000),
//     });
//     console.log(uploadResponse);
//     res.json({ msg: 'File uploaded successfully' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ err: 'Something went wrong' });
//   }
//   // res.status(200).json({ msg: 'Success' });
// });

// module.exports = router;
