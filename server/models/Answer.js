const mongoose = require('mongoose')

const AnswerSchema = new mongoose.Schema({
    questionId : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    like: {
        type: Number,
        default: 0
    },
    dislike: {
        type: Number,
        default: 0
    },
    userId: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    }
})

const Answer = mongoose.model('Answer',AnswerSchema)

module.exports = Answer;