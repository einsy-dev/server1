const { Schema, model } = require('mongoose');

const Category = new Schema({
    value: { type: String },
})

module.exports = model('Category', Category);