const mongoose = require('mongoose')

const answerSchema = new mongoose.Schema( {
    text: {
        type: String,
        minlength: 1,
        maxlength: 100,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    rating: {
        type: Number,
        default: 0
    }
})

const Answer = mongoose.model('Answer', answerSchema)

module.exports = Answer