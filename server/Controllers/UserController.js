const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


  

const createUser = async (req, res) => {
    const {name, email, password, cpassword, createdAt} = req.body;

    const userExist = await User.findOne({email : email});

   
    if(userExist){
        return res.status(422).json({error : "Email already exist"});
    }else if (password != cpassword){
        return res.status(422).json({error : "Enter correct password"});
    }else{
        const hashedPassword = bcrypt.hashSync(password, 12);
        const user = await User.create({
            name,
            email,
            password : hashedPassword,
            cpassword : hashedPassword,
            createdAt
        });
    
        res.json({user});
    };
};



const login = async (req, res) => {
    const {email, password} = req.body;
    // console.log(email);
    let token;
    const user = await User.findOne({email});
    // console.log(user)
    if(user){
        const passwordMatch = bcrypt.compareSync(password, user.password);
        // console.log(`Password: ${passwordMatch}`)
        if (passwordMatch) {
            const exp = Date.now() + 1000 * 60 * 60 * 24 * 30;
            token = jwt.sign({ sub: user._id, exp }, process.env.SECRET);
            res.cookie("Authorization", token, {
              expires: new Date(exp),
              httpOnly: false,
              domain: "localhost",
              path: "/",
            });
            res.json({ token });
          } else {
            return res.status(401).json({ error: "Incorrect Password!" });
          }
        } else {
          return res.status(401).json({ error: "Incorrect User!" });
        }
     
  };


  const logout = (req, res) => {
      res.clearCookie("Authorization");
      res.sendStatus(200);
  }

  const checkAuth = async (req, res) => {
    try {
        const token = req.body.token;
        console.log(token)
        if (token) {
          const decoded = jwt.verify(token, process.env.SECRET);
          // console.log(decoded)
          const user = await User.findById(decoded.sub);
          if (user) {
            res.json({ isLoggedIn: true, user: user });
          } else {
            res.json({ isLoggedIn: false });
          }
        } else {
          res.json({ isLoggedIn: false });
        }
      } catch (err) {
        res.json({ isLoggedIn: false });
      }
  }

  const forgotPassword = async (req, res) => {
    const { email } = req.body;
    const token = "GENERATE_UNIQUE_TOKEN_HERE";

    const user = await User.findOne({email});
    // console.log(user)
    if(user){

      const nodemailer = require("nodemailer");
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        },
      });
      // Send email with reset password link
      const mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: email,
        subject: "Password reset link",
        text: `Click the following link to reset your password: ${process.env.CLIENT_URL}/reset-password/${token}`,
      };
      try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({
          message: "Password reset link sent to your email address.",
        });
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error sending email." });
      }
    }
  }

  const updatePassword = async (req, res) => {
    sendStatus(200);
  }

const fetchUser = async (req, res) => {
  // Get id off the url
  const userId = req.body.authorId;

  // Find the note using that id
  const user = await User.findById(userId);

  // Respond with the note
  res.json({ user });
};


const fetchAllUser = async (req, res) => {
  const user = await User.find();

  // Respond with the note
  res.json({ user });
}



  
module.exports = {createUser, login, checkAuth, logout, fetchUser, fetchAllUser, forgotPassword, updatePassword};