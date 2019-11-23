var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    flash = require("connect-flash"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    Campground = require("./models/campgrounds"),
    Comment = require("./models/comment"),
    User = require("./models/user"),
    seedDB = require("./seeds")
//requiring routes    
var  commentRoutes = require("./routes/comments"),
     campgroundRoutes = require("./routes/campgrounds"),
     exerciseRoutes = require("./routes/exercises"),
     indexRoutes     =require ("./routes/index")

//Checking environment variable
console.log(process.env.DATABASEURL);
//environment variables
var url = process.env.DATABASEURL || "mongodb://localhost/werk_out"
mongoose.connect(url);    



app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
//Seed the database //seedDB();



//Passport Config
app.use(require("express-session")({
    secret: "Werk Out is the best way to workout",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});



//Use the routes

app.use(indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/exercises", exerciseRoutes);


//start server
// app.listen(process.env.PORT, process.env.IP, function(){
//     console.log("YelpCamp has started");
// });

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, () => console.log(`Example app listening on port ${port}!`))