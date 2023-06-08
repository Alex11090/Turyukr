const mongoose = require('mongoose')
const Schema = mongoose.Schema 

const ToursSchema = new Schema({
    id: { 
        type: String,
    },
    img: { 
        type: String,
    },
    title: { 
        type: String
    },
    timeTour:{ 
        type: String 
    },
    freePlaces: { 
        type: String
    },
    prise: { 
        type: Number
    },
    date: { 
        type: Date
    }
})

module.exports = mongoose.model('Tours', ToursSchema)