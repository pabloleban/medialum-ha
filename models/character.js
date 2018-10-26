const mongoose = require('mongoose');

const characterSchema = mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    materials: {},
    inventory: {}
  },
  { autoIndex: false }
)

module.exports = mongoose.model('Character', characterSchema);
