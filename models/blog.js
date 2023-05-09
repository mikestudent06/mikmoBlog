const mongoose = require("mongoose");
const Schema = mongoose.Schema; // This creates an object Schema 

//Let's now create a new instance of a schema where we will need to pass in an object, and it's this object which will describe the structure a the document we want to store in our blog collection:
const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
}, { timestamps: true } ) //we're also having a second argument to the Schema object, which is an object

//Let's create models:
const Blog = mongoose.model('Blog', blogSchema);

//Let's export our Blog model so we may use that outwhere in the project
module.exports = Blog;





