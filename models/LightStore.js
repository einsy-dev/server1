const { Schema, model } = require('mongoose');

const LightStore = new Schema({
    id: { type: String },
    title: { type: String },
    price: { type: Number },
    description: { type: String },
    category: { type: String },
    images: { type: String },
})

module.exports = model('LightStore', LightStore);