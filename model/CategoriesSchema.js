// Purpose: to create a schema for the Category collection in the database

//------------------Importing Packages----------------//
const mongooes = require('mongoose');
//----------------------------------------------------//

//------------------Category Schema----------------//
const CategoriesSchema = new mongooes.Schema({
    name: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: false,
    },

},  { timestamps: true });
//------------------------------------------------//

//------------------Export Schema----------------//
module.exports = mongooes.model('Category', CategoriesSchema);
//------------------------------------------------//