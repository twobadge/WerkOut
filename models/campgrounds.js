var mongoose = require("mongoose");

// Schema setup
var campgroundSchema = new mongoose.Schema({
    name: String,
    price :String,
    workout_date: { type: Date, default: Date.now },
    image: String,
    description: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        username: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }]
});

//create model

module.exports = mongoose.model("Campground", campgroundSchema);