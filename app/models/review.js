
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const ObjectId = mongoose.Schema.Types.ObjectId;

const reviewSchema = new Schema({
  description: { type: String, required: true },
  point: { type: Number, required: true },
  employerId: { type: ObjectId, required: true },
  employeeId: { type: ObjectId, required: true },
});

const Review = mongoose.model('review', reviewSchema);

module.exports = Review;
