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
     indexRoutes     =require ("./routes/index")

//environment variables

mongoose.connect(process.env.DATABASEURL);    
// mongoose.connect("mongodb+srv://Thomas:Mnni07473847335@cluster0-wcume.mongodb.net/yelp_camp?retryWrites=true");

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
//Seed the database //seedDB();

//Passport Config
app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
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


//start server
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YelpCamp has started");
});