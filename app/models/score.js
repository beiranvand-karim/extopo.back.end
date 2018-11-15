
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const ObjectId = mongoose.Schema.Types.ObjectId;

const scoreSchema = new Schema({
  fastness: { type: Number, required: true },
  responsiveness: { type: Number, required: true },
  friendliness: { type: Number, required: true },
  quality: { type: Number, required: true },
  score: { type: Number, required: true },
  employeeId: { type: ObjectId, required: true },
  employerId: { type: ObjectId, required: true },
  projectId: { type: ObjectId, required: true },
});

const Score = mongoose.model('score', scoreSchema);

module.exports = Score;
