import mongoose from 'mongoose';

const CharacterSchema = new mongoose.Schema({
  characterId: {
    type: Number,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  health: {
    type: Number,
    default: 500,
  },
  power: {
    type: Number,
    default: 100,
  },
  money: {
    type: Number,
    default: 10000,
  },
});

export default mongoose.model('Character', CharacterSchema);
