const service = require("./adminUploads.service");

async function uploadSingle(req, res, next) {
  try {
    const result = await service.uploadSingleOrMultiple(req, res);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
}

module.exports = { uploadSingle };
