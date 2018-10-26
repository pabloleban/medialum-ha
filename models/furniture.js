const mongoose = require('mongoose');

const furnitureSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    cost: Schema.Types.Mixed,
    description: { type: String },
    size: {
      width: { type: Number, required: true },
      height: { type: Number, required: true },
      layer_matrix: { type: [Number], required: true},
    }
  },
  { autoIndex: false }
)

module.exports = mongoose.model('Furniture', furnitureSchema);
