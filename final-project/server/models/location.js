const mongoose = require('mongoose');

const locationSchema = mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true},
    address: { type: String, required: true},
    phone: { type: String }
});

module.exports = mongoose.model('Location', locationSchema);