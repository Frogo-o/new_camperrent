const { Router } = require("express");
const { uploadInfoFiles } = require("./adminInfoFilesUpload.controller");

const router = Router();

router.post("/", async (req, res, next) => {
  try {
    await uploadInfoFiles(req, res);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
