const mongoose = require('mongoose');

const sequenceSchema = mongoose.Schema({
    maxBookId: { type: Number, default: 0 },
    maxLocationId: { type: Number, default: 0 },
    maxAuthorId: { type: Number, default: 0 }
});

module.exports = mongoose.model('Sequence', sequenceSchema, 'sequences');