const mongoose = require('mongoose');

const { Schema } = mongoose;

const schema = new Schema({
  // _id: String,
  name: String,
  lastName: String,
  email: String,
  friends: [{ name: String, email: String, phoneNumber: String }],
  birthDate: { type: Date },
  createdAt: { type: Date, default: Date.now },
  phoneNumber: String,
});

module.exports = mongoose.model('Persona', schema, 'persons');
