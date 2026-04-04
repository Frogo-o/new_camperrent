const { uploadSingleOrMultipleInfoFiles } = require("./adminInfoFilesUpload.service");

async function uploadInfoFiles(req, res) {
  const out = await uploadSingleOrMultipleInfoFiles(req, res);
  res.json(out);
}

module.exports = { uploadInfoFiles };
