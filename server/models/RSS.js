var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var RSSSchema = new Schema({
  // `title` is required and of type String
  title: {
    type: String,
    required: true
  },
  // `link` is required and of type String
  link: {
    type: String,
    required: true
  },

  article_body: {
    type: String
  },

  team: {
    type: String,
    required: true
  },

  img_url: {
    type: String,
    // required: true
  }, 
});

// This creates our model from the above schema, using mongoose's model method
var RSS = mongoose.model("RSS", RSSSchema);

// Export the Article model
module.exports = RSS;
