var mongoose = require("mongoose");

// Schema setup
var exerciseSchema = new mongoose.Schema({
    name: String,
    type: String,
    body_part: String,
    desceiption: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        username: String
    }
});

//create model
module.exports = mongoose.model("Exercise", exerciseSchema);