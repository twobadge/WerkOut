var mongoose = require("mongoose");

var commentSchema = mongoose.Schema({
    name: String,
    reps: String,
    weight: String,
    reps2: String,
    weight2: String,
    reps3: String,
    weight3: String,
    reps4: String,
    weight4: String,
    reps5: String,
    weight5: String,
    reps6: String,
    weight6: String,
    notes: String,
    notes2: String,
    notes3: String,
    notes4: String,
    notes5: String,
    notes6: String,
    notes7: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});




module.exports = mongoose.model("Comment", commentSchema);