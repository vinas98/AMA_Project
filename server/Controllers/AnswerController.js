const Answer = require("../models/Answer");

// const fetchQuestions = async (req, res) => {
//   // Find the notes
//   const questions = await Question.find();

//   // Respond with them
//   res.json({ questions });
// };


const fetchAnswers = async (req, res) => {
    // Get id off the url
    const questionId = req.params.id;
  
    // Find the note using that id
    const answer = await Answer.find({ questionId: questionId } );
  
    // Respond with the note
    res.json({ answer });
  };

  const fetchAnswersByUser = async (req, res) => {
    // Get id off the url
    const userId = req.params.userId;
  
    // Find the note using that id
    const answer = await Answer.find({ userId: userId } );
  
    // Respond with the note
    res.json({ answer });
  };
  
  const createAnswer = async (req, res) => {
    const { questionId, description, userId, userName } = req.body;

    // Create a note with it
    const answer = await Answer.create({
      questionId,
      description,
      userId,
      userName
    });

    const updatedAnswer = await Answer.find({ questionId: questionId } );
  
    // respond with the new note
    res.json({ updatedAnswer });
  };


  //update disLike
const updateAnswerDislike = async (req, res) => {
  try {
    const answerId = req.params.id;
    const answer = await Answer.findByIdAndUpdate(answerId, { $inc: { dislike: 1} }, { new: true });
    console.log(answer);
    res.json({ answer });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};


//update Like
const updateAnswerLike = async (req, res) => {
  try {
    const answerId = req.params.id;
    const answer = await Answer.findByIdAndUpdate(answerId, { $inc: { like: 1} }, { new: true });
    console.log(answer);
    res.json({ answer });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};





module.exports = {
    createAnswer,
    fetchAnswers,
    updateAnswerLike,
    updateAnswerDislike,
    fetchAnswersByUser
}