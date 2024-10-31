//Purpose: to create a schema for the Brand collection in the database

//------------------Importing Packages----------------//
const mongooes = require('mongoose');
//----------------------------------------------------//

//------------------Brand Schema----------------//
const BrandSchema = new mongooes.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false,
    },

    imageUrl: {
        type: String,
        required: true,
    },

},  { timestamps: true });
//------------------------------------------------//

//------------------Export Schema----------------//
module.exports = mongooes.model('Brand', BrandSchema);
//------------------------------------------------//