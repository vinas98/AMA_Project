const mongoose = require('mongoose')

const PreAnsweredQuestionSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    }
})

const PreAnsweredQuestion = mongoose.model('PreAnsweredQuestion',PreAnsweredQuestionSchema)

module.exports = PreAnsweredQuestion;