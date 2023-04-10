// const express = require('express')
// const mongoose = require('mongoose')
// const app = express();


// const FoodeModel = require('./models/Food')

// app.use(express.json);

// mongoose.connect("mongodb+srv://rohan:rohan@md444.tnpfu.mongodb.net/food?retryWrites=true&w=majority", {
//     useNewUrlParser: true,
// });


// app.get('/', async (req, res) => {
//     const food = new FoodeModel({foodName: 'Apple', daysSinceIAte: 3});


//     try{
//         await food.save();
//     }catch(err){
//         console.log(err);
//     }
// });
// app.listen(3000, ()=> {
//     console.log('Server running on port 3001...');
// });