const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
      username: {
            type: String,
            required: true,
            min: 3,
            max: 30,
            unique: true
      },
      email: {
            type: String,
            required: true,
            max: 30,
            unique: true
      },
      password: {
            type: String,
            required: true,
            min: 6,
            max:10
      },
      profilePicture: {
            type: String,
            default: ''
      },
      isAdmin: {
            type: Boolean,
            default: false
      },
},
      { timestamps: true }
);

module.exports = mongoose.model('user', UserSchema)