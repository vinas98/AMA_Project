const mongoose = require('mongoose')


const FeedbackSchema = new mongoose.Schema({
    emojiValue:{
        type: Number,
        required: true,
    },
    category: {
        type: Number,
        required: true,
    }, 
    feedbackDescription: {
        type: String,
        required: true,
    }
});

const Feedback = mongoose.model('Feedback', FeedbackSchema);
module.exports = Feedback;