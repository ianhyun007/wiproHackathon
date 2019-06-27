const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Post = require("./models/post");
const path = require("path");
const multer = require("multer");

const app = express();

// var event = new Date();
// console.log(event.toISOString());

mongoose
  .connect(
    // "mongodb+srv://ian:3K9a238WP6XyglY0@cluster0-cewez.mongodb.net/node-angular?retryWrites=true&w=majority",
    "mongodb://localhost:27017/hackathon-angular",
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch((e) => {
    console.log("Connection failed! : "+e);
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("backend/images")));

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg"
};
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, "backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname
      .toLowerCase()
      .split(" ")
      .join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  }
});

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/posts", multer({ storage: storage }).single("image"), (req, res, next) => {
// app.post("/api/posts", (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  var nDate = new Date(req.body.startDate);
  // const post = req.body;  //new field added by bodyparser
const post = new Post({
  title: req.body.title,
  content: req.body.content,
  startDate: nDate,
  imagePath: url + "/images/" + req.file.filename
});
// console.log(post);
  // res.status(201).json({  //OK and new resource created VS 200
  //   message: 'Post added successfully'
  // });
// post.save().then(createdPost => { 
//   res.status(201).json({
//     message: "Post added successfully",
//     postId: createdPost._id
//   });
// });
post.save().then(createdPost => {
  res.status(201).json({
    message: "Post added successfully",
    post: {
      ...createdPost,
      id: createdPost._id,
      imagePath: createdPost.imagePath
    }
  });
});
});

app.get("/api/posts/:whichGet", (req, res, next) => {
  let postMode = req.params.whichGet;
  if(postMode === 'todays') {
    var start = new Date();
    start.setHours(0,0,0,0);
    var end = new Date();
    end.setHours(23,59,59,999);
    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Post.find({"startDate" : {$eq: new Date()}}).then(documents => {            //TODAYS!!
    Post.find({"startDate" : {$gte: start, $lt: end}}).then(documents => {            //TODAYS!!
      res.status(200).json({
        message:'post fetch success',
        posts: documents
      });
    });
  } else if(postMode === 'archived') {
    Post.find({"startDate" : {$lt: new Date().setHours(0,0,0,0)}}).then(documents => {            //ARCHIVED!!
    // Post.find({"startDate" : {$lt: start}}).then(documents => {
      res.status(200).json({
        message:'post fetch success',
        posts: documents
      });
    });
  } else if(postMode === 'upcoming') {
    Post.find({"startDate" : {$gt: new Date().setHours(23,59,59,999)}}).then(documents => {            //UPCOMING!!
      res.status(200).json({
        message:'post fetch success',
        posts: documents
      });
    });
  }
});

app.get("/api/posts", (req, res, next) => {
  // const posts = [
  //   {
  //     id: "fadf12421l",
  //     title: "First server-side post",
  //     content: "This is coming from the server"
  //   },
  //   {
  //     id: "ksajflaj132",
  //     title: "Second server-side post",
  //     content: "This is coming from the server!"
  //   }
  // ];

  Post.find().then(documents => {
  // Post.find( { title: "testing333" } ).then(documents => {
  // Post.find({"startDate" : { "$lte" : new Date("2019-10-01T00:00:00.000Z")}}).then(documents => {
  // Post.find({"startDate" : {$lt: new Date()}}).then(documents => {         //ARCHIVED!!
  // Post.find({"startDate" : {$gt: new Date()}}).then(documents => {           //UPCOMING!!
  // Post.find({"startDate" : {$eq: new Date()}}).then(documents => {            //TODAYS!!
    res.status(200).json({
      message:'post fetch success',
      posts: documents
    });
  });
});

app.delete("/api/posts/:id", (req, res, next) => {
  Post.deleteOne({ _id: req.params.id }).then(result => {
    res.status(200).json({ message: "Post deleted!" });
  });
});

// app.put("/api/posts/:id", (req, res, next) => {
//   const post = new Post({
//     _id: req.body.id,
//     title: req.body.title,
//     content: req.body.content
//   });
//   Post.updateOne({ _id: req.params.id }, post).then(result => {
//     res.status(200).json({ message: "Update successful!" });
//   });
// });
app.put(
  "/api/posts/:id",
  multer({ storage: storage }).single("image"),
  (req, res, next) => {
    let imagePath = req.body.imagePath;
    if (req.file) {
      const url = req.protocol + "://" + req.get("host");
      imagePath = url + "/images/" + req.file.filename
    }
    const post = new Post({
      _id: req.body.id,
      title: req.body.title,
      content: req.body.content,
      startDate: req.body.startDate,
      imagePath: imagePath
    });
    Post.updateOne({ _id: req.params.id }, post).then(result => {
      res.status(200).json({ message: "Update successful!" });
    });
  }
);

module.exports = app;


// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PATCH, DELETE, OPTIONS"
//   );
//   next();
// });

// app.post("/api/posts", (req, res, next) => {
//   const post = req.body;
//   console.log(post);
//   res.status(201).json({
//     message: 'Post added successfully'
//   });
// });

// app.get("/api/posts", (req, res, next) => {
//   const posts = [
//     {
//       id: "fadf12421l",
//       title: "First server-side post",
//       content: "This is coming from the server"
//     },
//     {
//       id: "ksajflaj132",
//       title: "Second server-side post",
//       content: "This is coming from the server!"
//     }
//   ];
//   res.status(200).json({
//     message: "Posts fetched successfully!",
//     posts: posts
//   });
// });

// module.exports = app;
