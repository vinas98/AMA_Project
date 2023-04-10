const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: {
        type : String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase:true,
        index: true,
    },
    password:{
        type: String,
        required: true
    },
    cpassword:{
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now()
    },

})

const User = mongoose.model('User',UserSchema);



module.exports = User;