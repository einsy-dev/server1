const { Schema, model } = require('mongoose');

const Item = new Schema({
    id: { type: String },
    date: { type: Date, default: Date.now() },
    title: { type: String },
    price: { type: Number },
    description: { type: String },
    specs: { type: String },
    category: { type: String },
    images: { type: Array },
})

module.exports = model('Item', Item);