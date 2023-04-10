const Feedback = require("../models/Feedback");

const createFeedback = async (req, res) => {
    const {emojiValue, category, feedbackDescription} = req.body;

    const feedback = await Feedback.create({
        emojiValue,
        category,
        feedbackDescription,
    });

    res.json({feedback});
};

module.exports = {createFeedback};