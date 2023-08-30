const { Schema, model } = require('mongoose');

const Order = new Schema({
    userId: { type: String },
    date: { type: Date, default: Date.now() },
    phone: { type: String },
    name: { type: String },
    info: { type: String },
    items: { type: Array },
    status: { type: String },
})

module.exports = model('Order', Order);
