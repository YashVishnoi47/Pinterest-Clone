var express = require('express');
var router = express.Router();
const userModel = require("./users");
const postModel = require("./post");
const passport =  require('passport');

const localStratergy = require('passport-local');
passport.use(new localStratergy(userModel.authenticate()));


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/login', function(req, res, next) {
  res.render('login');
});

router.get('/profile',isLoggedIn , function(req, res, next) {
  res.render("profile")
});

router.get('/feed', function(req, res, next) {
  res.render('feed');
});


router.post('/register',function(req,res,next){
 const userdata = new userModel({
  username: req.body.username,
  email: req.body.email,
  fullname: req.body.fullname
 });

 userModel.register(userdata,req.body.password)
 .then(function(){
  passport.authenticate('local')(req,res,function(){
    res.redirect("/profile");
  })
 })

});


router.post("/login",passport.authenticate("local",{  
  successRedirect:"/profile",
  failureRedirect:"/login"
}),function(req,res){
});


router.get('/logout', function(req, res, next) {
  req.logOut(function(err) {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});


function isLoggedIn (req,res,next){
  if(req.isAuthenticated()) return next(); 
  res.redirect("/login")
}









// router.get('/appuserspost', async function(req, res, next) {
//   let user = await userModel
//   .findOne({_id:"6711f2f9fc60860ff53b36cf"})
//   .populate('posts')
//   res.send(user);
// });

// router.get('/createuser', async function(req, res, next) {
//   let createduser = await userModel.create({
//   username: " yash Bishnoi",
//   password: "yash`",
//   posts: [],
//   email: "yash@maan.com",
//   fullname: "Yash Bishnoi"
//   })

//   res.send(createduser);
// });

// router.get('/createpost', async function(req,res,next ){
//   let createdpost = await postModel.create ({
//     postText: "text of post",
//     user:"6711f2f9fc60860ff53b36cf"
//   });

//   let user = await userModel.findOne({_id:"6711f2f9fc60860ff53b36cf"})
//   user.posts.push(createdpost._id);
//   await user.save();
//   res.send("done");
// });

module.exports = router;
