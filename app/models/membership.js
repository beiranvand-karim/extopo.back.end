
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const ObjectId = mongoose.Schema.Types.ObjectId;

const membershipSchema = new Schema({
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  userId: { type: ObjectId, required: true },
  userType: { type: ObjectId, required: true }
});


const Membership = mongoose.model('membership', membershipSchema);

module.exports = Membership;
