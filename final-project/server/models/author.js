const mongoose = require('mongoose');

const authorSchema = mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    age: { type: Number },
    imageUrl: { type: String },
    group: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Author'}]
});

module.exports = mongoose.model('Author', authorSchema);