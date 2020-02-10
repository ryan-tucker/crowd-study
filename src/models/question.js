const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
    text: {
        type: String,
        minLength: 1,
        maxLength: 100,
        required: true
    },
    category: {
        type: String,
        minLength: 1,
        maxLength: 20,
        required: true
    },
    answers: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Answer'
        }]
    }
})

const Question = mongoose.model('Question', questionSchema)

module.exports = Question