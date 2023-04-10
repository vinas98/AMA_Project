const mongoose = require('mongoose')


const TagSchema = new mongoose.Schema({
    tagName:{
        type: String
    },
    tagBody: {type : String}
});

const Tag = mongoose.model('Tag', TagSchema);
module.exports = Tag;