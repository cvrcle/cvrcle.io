const Model = require('objection').Model;
const User = require('./User')
const Entry = require('./Entry')

class Itinerary extends Model {
  static get tableName() {
    return 'itineraries'
  }


  static get jsonSchema() {
    return {
      type: 'object',
      required: ['ownerID', 'itinName', 'isActive', 'isPublic'],

      properties: {
        id:       { type: 'integer'},
        ownerID:  { type: 'string', minLength: 1, maxLength: 255 },
        itinName: { type: 'string', minLength: 1, maxLength: 255},
        isActive: { type: 'integer' },
        isPublic: { type: 'integer' }
      }
    };
  }

  static get relationMappings() {
    return {

      owner: {
        relation: Model.BelongsToOneRelation,
        modelClass: __dirname + '/User',
        join: {
          from: 'itineraries.ownerID',
          to: 'users.id'
        }
      },

      entries: {
        relation: Model.HasManyRelation,
        modelClass: __dirname + '/Entry',
        join: {
          from: 'itineraries.id',
          to: 'entries.itinID'
        }
      }
    }

  }

}

module.exports = Itinerary;
