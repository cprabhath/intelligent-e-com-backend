//Purpose: Category controller to handle all the request and response

//-----------------------Importing Packages-------------------------//
const CategoriesSchema = require("../model/CategoriesSchema");
const ResponseService = require("../services/ResponseService");
//-----------------------------------------------------------------//

//------------------Category Create----------------//
const create = (req, resp) => {
  const categoriesSchema = new CategoriesSchema({
    name: req.body.name,
    description: req.body.description,
  });

  categoriesSchema
    .save()
    .then(() => {
      return ResponseService(resp, 200, "Category created successfully");
    })
    .catch((err) => {
      return ResponseService(resp, 500, err.message);
    });
};
//-----------------------------------------------//

//------------------Category Find By Id-----------//
const findById = (req, resp) => {
  CategoriesSchema.findById({ _id: req.params.id })
    .then((selectedObj) => {
      if (!selectedObj) {
        return ResponseService(
          resp,
          404,
          "Category not found with id " + req.params.id
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

//------------------Category Update---------------//
const update = async (req, resp) => {
  const updateData = await CategoriesSchema.findOneAndUpdate(
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
          "Category not found with id " + req.params.id
        );
      } else {
        return ResponseService(resp, 200, "Category updated successfully");
      }
    })
    .catch((err) => {
      return ResponseService(resp, 500, err.message);
    });
};
//-----------------------------------------------//

//------------------Category Delete---------------//
const deleteById = (req, resp) => {
  CategoriesSchema.findByIdAndDelete({ _id: req.params.id })
    .then((data) => {
      if (!data) {
        return ResponseService(
          resp,
          404,
          "Category not found with id " + req.params.id
        );
      } else {
        return ResponseService(resp, 200, "Category deleted successfully");
      }
    })
    .catch((err) => {
      return ResponseService(resp, 500, err.message);
    });
};
//-----------------------------------------------//

//------------------Category Find All-------------//
const findAll = (req, resp) => {
  CategoriesSchema.find()
    .then((data) => {
      resp.send(data);
    })
    .catch((err) => {
      return ResponseService(resp, 500, err.message);
    });
};
//-----------------------------------------------//

//------------------Category Count----------------//
const count = (req, resp) => {
  CategoriesSchema.countDocuments()
    .then((data) => {
      resp.send({ count: data });
    })
    .catch((err) => {
      return ResponseService(resp, 500, err.message);
    });
};
//-----------------------------------------------//

//------------------Export Module----------------//
module.exports = {
  create,
  findById,
  update,
  deleteById,
  findAll,
  count,
};
//-----------------------------------------------//
