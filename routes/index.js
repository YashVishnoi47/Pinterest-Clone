var express = require('express');
var router = express.Router();
const userModel = require("./users");
const postModel = require("./post");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/appuserspost', async function(req, res, next) {
  let user = await userModel
  .findOne({_id:"6711f2f9fc60860ff53b36cf"})
  .populate('posts')
  res.send(user);
});

router.get('/createuser', async function(req, res, next) {
  let createduser = await userModel.create({
  username: " yash Bishnoi",
  password: "yash`",
  posts: [],
  email: "yash@maan.com",
  fullname: "Yash Bishnoi"
  })

  res.send(createduser);
});

router.get('/createpost', async function(req,res,next ){
  let createdpost = await postModel.create ({
    postText: "text of post",
    user:"6711f2f9fc60860ff53b36cf"
  });

  let user = await userModel.findOne({_id:"6711f2f9fc60860ff53b36cf"})
  user.posts.push(createdpost._id);
  await user.save();
  res.send("done");
});

module.exports = router;
