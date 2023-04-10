const PreAnsweredQuestion = require("../models/preansweredQuestion");

const fetchQuestions = async (req, res) => {
  // Find the notes
  const preansweredQuestions = await PreAnsweredQuestion.find();

  // Respond with them
  res.json({ preansweredQuestions });
};
const createQuestion = async (req, res) => {
    // Get the sent in data off request body
    const { title, description } = req.body;
  
    // Create a note with it
    const preansweredQuestions = await PreAnsweredQuestion.create({
      title,
      description,
    });
  
    // respond with the new note
    res.json({ preansweredQuestions });
  };


module.exports = {fetchQuestions, createQuestion};