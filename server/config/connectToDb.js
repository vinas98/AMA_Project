
//Importing dependencies
const mongoose = require('mongoose');



async function connectToDb(){
    try{

        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
             useUnifiedTopology: true,
        }).then(() =>{
            console.log('Database connected..')
        });
    }catch(err){
        console.log(err);
    }
}

module.exports = connectToDb;