//Purpose: Brand controller to handle all the request and response

//-----------------------Importing Packages-------------------------//
const BrandSchema = require("../model/BrandSchema");
const ResponseService = require("../services/ResponseService");
//-----------------------------------------------------------------//

//------------------Brand Create----------------//
const create = (req, resp) => {
  const brandSchema = new BrandSchema({
    name: req.body.name,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
  });

  brandSchema
    .save()
    .then(() => {
      return ResponseService(resp, 200, "Brand created successfully");
    })
    .catch((err) => {
      return ResponseService(resp, 500, err.message);
    });
};
//-----------------------------------------------//

//------------------Brand Find By Id-----------//
const findById = (req, resp) => {
  BrandSchema.findById({ _id: req.params.id })
    .then((selectedObj) => {
      if (!selectedObj) {
        return ResponseService(
          resp,
          404,
          "Brand not found with id " + req.params.id
        );
      } else {
        resp.send(selectedObj);
      }
    })
    .catch((err) => {
      return ResponseService(resp, 500, err.message);
    });
};
//-----------------------------------------------//

//------------------Brand Update---------------//
const update = async (req, resp) => {
  const updateData = await BrandSchema.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        name: req.body.name,
        description: req.body.description,
      },
    },
    { new: true }
  )
    .then((data) => {
      if (!data) {
        return ResponseService(
          resp,
          404,
          "Brand not found with id " + req.params.id
        );
      } else {
        return ResponseService(resp, 200, "Brand updated successfully");
      }
    })
    .catch((err) => {
      return ResponseService(resp, 500, err.message);
    });
};
//-----------------------------------------------//

//------------------Brand Delete---------------//
const deleteById = async (req, resp) => {
    const deleteData = await BrandSchema.findByIdAndDelete(req.params.id)
    .then((data) => {
      if (!data) {
        return ResponseService(
          resp,
          404,
          "Brand not found with id " + req.params.id
        );
      } else {
        return ResponseService(resp, 200, "Brand deleted successfully");
      }
    })
};
//-----------------------------------------------//

//------------------Brand Find All---------------//
const findAll = (req, resp) => {
  BrandSchema.find()
    .then((data) => {
      resp.send(data);
    })
    .catch((err) => {
      return ResponseService(resp, 500, err.message);
    });
};
//-----------------------------------------------//

//------------------Brand Count----------------//
const count = (req, resp) => {
  BrandSchema.countDocuments()
    .then((data) => {
      resp.send(data.toString());
    })
    .catch((err) => {
      return ResponseService(resp, 500, err.message);
    });
};
//-----------------------------------------------//

//------------------Export Module---------------//
module.exports = {
  create,
  findById,
  update,
  deleteById,
  findAll,
  count,
};
//-----------------------------------------------//
