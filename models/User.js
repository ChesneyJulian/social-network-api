const { Schema, model } = require('mongoose');

// define schema to create User model
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: {
        validator: function(str) {
          return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(str);
        },
        message: "Please enter a valid email"
      }
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'thought'
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user'
      }
    ]
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// create friendCount virtual to get number of friends user has
userSchema
  .virtual('friendCount')
  .get(function () {
    return this.friends.length;
  });

// initialize User model with userSchema
const User = model('user', userSchema);

module.exports = User;