const mongoose = require("mongoose");
const User = mongoose.Schema;

const userTemplate = new User({
  name: {
    type: String,
    required: true,
  },
  mail: {
    type: String,
    required: true,
  },
  pass: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("User", userTemplate);
