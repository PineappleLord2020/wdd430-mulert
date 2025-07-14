var Sequence = require('../models/sequence');

var maxBookId;
var maxLocationId;
var maxAuthorId;
var sequenceId = null;


function SequenceGenerator() {
  this.sequence = null;
  this.sequenceId = 0;
  this.maxBookId = 0;
  this.maxLocationId = 0;
  this.maxAuthorId = 0;

  Sequence.findOne().exec()
  .then(sequence => {
    if (sequence) {
      this.sequence = sequence;
      this.sequenceId = sequence._id;
      this.maxBookId = sequence.maxBookId;
      this.maxLocationId = sequence.maxLocationId;
      this.maxAuthorId = sequence.maxAuthorId;
      console.log('Sequence loaded:', this.sequence);
    } else {
      console.warn('Sequence document not found in DB. Please ensure it is created.');
    }
  })
    .catch(err => {
      console.error('Error fetching sequence:', err);
    });
}

SequenceGenerator.prototype.nextId = function(collectionType) {

  return Sequence.findOne({})
    .then(sequence => {
      if (!sequence) {
        throw new Error('Sequence document not found! Please ensure it exists in your database.');
      }

      let nextId;

      switch (collectionType) {
        case 'books':
          sequence.maxBookId++;
          nextId = sequence.maxBookId;
          break;
        case 'locations':
          sequence.maxLocationId++;
          nextId = sequence.maxLocationId;
          break;
        case 'authors':
          sequence.maxAuthorId++;
          nextId = sequence.maxAuthorId;
          break;
        default:
          throw new Error('Invalid collection type provided to sequenceGenerator.');   
      }

      return sequence.save()
        .then(() => {
          return nextId;
        })
        .catch(saveError => {
          console.error(`Error saving updated sequence for ${collectionType}:`, saveError);
          throw saveError;
        });
    })
    .catch(fetchError => {
      console.error('Error fetching sequence in SequenceGenerator:', fetchError);
      throw fetchError;
    });
};

module.exports = new SequenceGenerator();
