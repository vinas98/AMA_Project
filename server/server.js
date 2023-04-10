

// Load env variables
if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}


  // Import dependencies
  const express = require("express");
  const cors = require("cors");
  const connectToDb = require("./config/connectToDb");
  const questionsController = require("./Controllers/QuestionController");
  const feedbackController = require('./Controllers/FeedbackController');
  const preansweredQuestionController = require('./Controllers/PreanswereQuestionController');
  const answerController = require('./Controllers/AnswerController');
  const userController = require('./Controllers/UserController');
  const cookieParser = require("cookie-parser");
  const tagController = require('./Controllers/TagController');
  // This should already be declared in your API file
var app = express();

app.use(express.json());
app.use(cookieParser());
// app.use(cors());


app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.options('*', cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

// {
//   origin: true,
//   credentials: true,
// })
  // Connect to database
  connectToDb();
  
  // Routing
  app.get("/questions", questionsController.fetchQuestions);
  app.get("/questions/:id", questionsController.fetchQuestion);
  app.post("/questions", questionsController.createQuestion);
  app.get('/searchQuestions/:query', questionsController.searchQuestions);
  app.put('/updateView/:view', questionsController.updateQuestionView);
  app.put('/updateAnswer/:id', questionsController.updateQuestionAnswer);
  app.put('/updateLike/:id', questionsController.updateQuestionLike);
  app.get("/questionsByUser/:userId", questionsController.fetchQuestionsByUser);
  app.put('/updateDislike/:id', questionsController.updateQuestionDislike);


  app.post("/feedbacks", feedbackController.createFeedback);
  app.get("/preansweredQuestions", preansweredQuestionController.fetchQuestions);
  app.post("/preansweredQuestions", preansweredQuestionController.createQuestion);

  app.post("/answer", answerController.createAnswer);
  app.get("/answers/:id", answerController.fetchAnswers);
  app.get("/answersByUser/:userId", answerController.fetchAnswersByUser);
  app.put('/updateAnswerLike/:id', answerController.updateAnswerLike);
  app.put('/updateAnswerDislike/:id', answerController.updateAnswerDislike);

  app.post("/check-auth",  userController.checkAuth);

  app.post("/createUser", userController.createUser);
  app.post("/fetchAuthor", userController.fetchUser);
  app.post("/login", userController.login);
  app.get("/logout", userController.logout);
  app.get("/fetchAllUser", userController.fetchAllUser);
  app.post("/forgot-password", userController.forgotPassword);
  app.post("/reset-password/:token", userController.updatePassword);

  app.post("/createTag", tagController.createTag);
  app.get("/fetchTag", tagController.fetchTag);

  app.listen(process.env.PORT);
  console.log(`Port Number: ${process.env.PORT}`);