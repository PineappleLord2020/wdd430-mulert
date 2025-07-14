const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String},
    description: { type: String},
    url: { type: String, required: true },
    release: { type: Date},
    children: [{
        id: { type: String, required: true },
        name: { type: String},
        url: { type: String, required: true },
        release: { type: Date}
    }]
});

module.exports = mongoose.model('Book', bookSchema, 'books');