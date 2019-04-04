const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const freelancerSchema = new Schema({
  fname: {
    type: String,
    required: true
  },
  lname: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  works: {
    type: String,
    required: true
  },
  officeaddr: {
    type: String,
    required: true
  },
  experience: {
    type: String,
    required: true
  },
  cost: {
    type: String,
    required: true
  },
  contactnum: {
    type: String,
    required: true
  },
  profilepic: {
    type: String,
    default: 'https://img.icons8.com/ultraviolet/80/000000/user.png'
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = freelancer = mongoose.model('freelancer', freelancerSchema);
