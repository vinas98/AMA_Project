const { sendStatus } = require("express/lib/response");
const Question = require("../models/Question");

const fetchQuestions = async (req, res) => {
  // Find the notes
  const questions = await Question.find();

  // Respond with them
  res.json({ questions });
};

const fetchQuestionsByUser = async (req, res) => {
  // Get id off the url
  const userId = req.params.userId;

  // Find the note using that id
  const question = await Question.find({ userId: userId } );

  // Respond with the note
  res.json({ question });
};

const searchQuestions =  async (req, res) => {
  const query = req.params.query;
  const questions = await Question.find({ title: { $regex: query, $options: 'i' } });
  res.json({questions});
};

const updateQuestionView = async (req, res) => {
  try {
    const questionId = req.params.view;
    const question = await Question.findByIdAndUpdate(questionId, { $inc: { view: 0.5} }, { new: true });
    console.log(question);
    res.json({ question });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

const updateQuestionAnswer = async (req, res) => {
  try {
    const questionId = req.params.id;
    const question = await Question.findByIdAndUpdate(questionId, { $inc: { answered: 1} }, { new: true });
    console.log(question);
    res.json({ question });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

//update Like
const updateQuestionLike = async (req, res) => {
  try {
    const questionId = req.params.id;
    const question = await Question.findByIdAndUpdate(questionId, { $inc: { like: 1} }, { new: true });
    console.log(question);
    res.json({ question });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

//update disLike
const updateQuestionDislike = async (req, res) => {
  try {
    const questionId = req.params.id;
    const question = await Question.findByIdAndUpdate(questionId, { $inc: { dislike: 1} }, { new: true });
    console.log(question);
    res.json({ question });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};



const fetchQuestion = async (req, res) => {
    // Get id off the url
    const questionId = req.params.id;
  
    // Find the note using that id
    const question = await Question.findById(questionId);
  
    // Respond with the note
    res.json({ question });
  };
  
  const createQuestion = async (req, res) => {
    const { title, description, tags, createdAt, userId, userName } = req.body;

    // Create a note with it
    const question = await Question.create({
      title,
      description,
      tags,
      createdAt,
      userId,
      userName
    });
  
    // respond with the new note
    res.json({ question });
  };




module.exports = {
    fetchQuestion,
    fetchQuestions,
    createQuestion,
    searchQuestions,
    updateQuestionView,
    updateQuestionAnswer,
    updateQuestionLike,
    updateQuestionDislike,
    fetchQuestionsByUser,
}