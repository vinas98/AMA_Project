const mongoose = require('mongoose')

const QuestionSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    tags : {
        type: [],
        required : true
    },
    createdAt: {
        type: String,
        required: true
    },
    view:{
        type: Number,
        default: 0
    },
    answered: {
        type: Number,
        default: 0
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

const Question = mongoose.model('Question',QuestionSchema)

module.exports = Question;