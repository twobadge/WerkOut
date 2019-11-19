var express = require("express");
var router = express.Router();
var Exercise = require("../models/exercises");
var middleware = require("../middleware")

//Index
router.get("/", function(req, res){
        // Get all Exercises from db
        Exercise.find({}, function(err, allExercises){
            if (err){
                console.log(err);
            } else {
               res.render("exercises/index", {exercises:allExercises, currentUser: req.user});
            }
    });
});


//Create - add new Exercise to DB
router.post("/", middleware.isLoggedIn, function(req, res){
    var name = req.body.name;
    var type  = req.body.price;
    var body_part = req.body.body_part;
    var desc = req.body.description;
    var author = {
      id: req.user._id,
      username: req.user.username
    }
    var newExercise = {name: name, type:type, body_part: body_part, description: desc, author:author}
    console.log(req.user);
    // Create new exercise and save to db
Exercise.create(newExercise, function(err, newlyCreated){
        if (err){
            console.log(err);
        } else {
            //redirect to Exercises page
            console.log(newlyCreated);
            res.redirect("/exercises");
        }
    });
    //get data from form and add to Exercises array
});

router.get("/new", middleware.isLoggedIn, function(req, res) {
    res.render("exercise/new");
});

//shows more info about one exercise

router.get("/:id", function(req, res) {
    //find the exercise with provided ID
    Exercise.findById(req.params.id).exec(function(err, foundExercise){
       if (err){
           console.log(err);
       } else {
           console.log(foundExercise)
           res.render("exercises/show", {exercise: foundExercise});
       } 
    });
});

//Edit Exercise route
router.get("/:id/edit", middleware.checkExerciseOwnership, function(req, res) {
        Exercise.findById(req.params.id, function(err, foundExercise){
               res.render("Exercises/edit", {Exercise: foundExercise});
    });
   });

//Update route
router.put("/:id",middleware.checkExerciseOwnership, function(req, res){
    // find and update the correct Exercise
    Exercise.findByIdAndUpdate(req.params.id, req.body.Exercise, function(err, updatedExercise){
       if(err){
           res.redirect("/Exercises");
       } else {
           //redirect somewhere(show page)
           res.redirect("/Exercises/" + req.params.id);
       }
    });
});

//Destroy Exercise route
router.delete("/:id", middleware.checkExerciseOwnership, function(req, res){
    Exercise.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/Exercises");
        } else {
            res.redirect("/Exercises");
        }
    });
});


module.exports = router;