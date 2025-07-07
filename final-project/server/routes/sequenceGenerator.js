var Sequence = require('../models/sequence');

function SequenceGenerator() {

}

SequenceGenerator.prototype.nextId = function(collectionType) {

  return Sequence.findOne({})
    .then(sequence => {
      if (!sequence) {
        throw new Error('Sequence document not found! Please ensure it exists in your database.');
      }

      let nextId;

      switch (collectionType) {
        case 'documents':
          sequence.maxDocumentId++;
          nextId = sequence.maxDocumentId;
          break;
        case 'messages':
          sequence.maxMessageId++;
          nextId = sequence.maxMessageId;
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
