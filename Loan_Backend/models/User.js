const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /.+\@.+\..+/,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    phone: {
      type: String, // Stores phone number, optional field
      default: '',  // Empty string if not provided
    },
    dob: {
      type: Date,   // Stores date of birth
      default: null, // Null if not provided
    },
    profileImage: {
      type: String, // Stores the URL/path of the profile image
      default: '',  // Empty string if no image is provided
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

module.exports = mongoose.model("User", userSchema);
