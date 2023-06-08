const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Tour = new Schema({
    id: {
        type: String
    },
    titleTour: {
        type: String,
    },
    discrTuor: {
        type: String
    },
    date: {
        type: Date
    }

})

module.exports = mongoose.model("Tour-discription", Tour)