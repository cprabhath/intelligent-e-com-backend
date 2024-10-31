// Used for controlling the settings page

//------------------Importing Packages----------------//
const Settings = require("../model/SettingsSchema");
const ResponseService = require("../services/ResponseService");
//----------------------------------------------------//

//------------------Settings Create----------------//
const create = (req, resp) => {
  const settings = new Settings({
    systemCurrency: req.body.currency,
    isRoleBasedAccess: req.body.isRoleModeEnabled,
  });

  settings
    .save()
    .then(() => {
      return ResponseService(resp, 200, "Settings created successfully");
    })
    .catch((err) => {
      return ResponseService(resp, 500, err.message);
    });
};
//-----------------------------------------------//

//------------------Settings Get All----------------//
const getAll = (req, resp) => {
  Settings.find()
    .then((data) => {
      return ResponseService(resp, 200, data);
    })
    .catch((err) => {
      return ResponseService(resp, 500, err.message);
    });
};
//-----------------------------------------------//

//------------------Settings Update----------------//
const update = (req, resp) => {
  const updateData = Settings.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        systemCurrency: req.body.currency,
        isRoleBasedAccess: req.body.isRoleModeEnabled,
      },
    },
    { new: true }
  )
    .then((data) => {
      if (!data) {
        return ResponseService(resp, 404, "Settings not found");
      } else {
        return ResponseService(resp, 200, "Settings updated successfully");
      }
    })
    .catch((err) => {
      return ResponseService(resp, 500, err.message);
    });
};
//-----------------------------------------------//

//-----------------------export module--------------------//
module.exports = {
  create,
  getAll,
  update,
};
