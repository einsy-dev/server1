const { Schema, model } = require('mongoose');

const Store = new Schema({
    id: { type: String },
    title: { type: String },
    price: { type: Number },
    description: { type: String },
    specs: { type: String },
    category: { type: String },
    images: { type: Array },
})

module.exports = model('Store', Store);