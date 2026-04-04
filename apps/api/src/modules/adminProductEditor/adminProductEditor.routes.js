const express = require("express");
const controller = require("./adminProductEditor.controller");
const { requireAdmin } = require("../../middlewares/requireAdmin");

const router = express.Router();

/* =========================
   PRODUCT
========================= */

router.get("/:slug", requireAdmin, controller.getBySlug);
router.patch("/:slug", requireAdmin, controller.patchBySlug);

/* =========================
   IMAGES
========================= */

router.post("/:slug/images", requireAdmin, controller.postImage);
router.patch("/:slug/images/:imageId", requireAdmin, controller.patchImage);
router.delete("/:slug/images/:imageId", requireAdmin, controller.deleteImage);
router.put("/:slug/images/reorder", requireAdmin, controller.reorderImages);

/* =========================
   INFO FILES (same as images)
========================= */

router.post("/:slug/info-files", requireAdmin, controller.postInfoFile);
router.patch("/:slug/info-files/:fileId", requireAdmin, controller.patchInfoFile);
router.delete("/:slug/info-files/:fileId", requireAdmin, controller.deleteInfoFile);
router.put("/:slug/info-files/reorder", requireAdmin, controller.reorderInfoFiles);

module.exports = router;
