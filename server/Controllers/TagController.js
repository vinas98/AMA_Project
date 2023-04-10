const Tag = require("../models/Tag");

const createTag = async (req, res) => {
    const {tagName, tagBody} = req.body;

    const tag = await Tag.create({
        tagName,
        tagBody,
    });

    res.json({tag});
};

const fetchTag = async (req, res) => {
    const tag = await Tag.find();

    res.json({tag});
};

module.exports = {createTag, fetchTag};