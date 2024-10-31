// Purpose: to create a schema for the settings collection in the database

//------------------Importing Packages----------------//
const mongoose = require("mongoose");
//----------------------------------------------------//

//------------------Settings Schema----------------//
const SettingsSchema = new mongoose.Schema({
    systemCurrency: {
        type: String,
        required: true,
    },

    isRoleBasedAccess: {
        type: Boolean,
        required: true,
    },
    
}, { timestamps: true });
//--------------------------------------------//

//------------------Export Schema----------------//
module.exports = mongoose.model("Settings", SettingsSchema);
//-----------------------------------------------//