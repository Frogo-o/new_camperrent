const { Router } = require("express");

const catalogModule = require("../modules/catalog");
const ordersModule = require("../modules/orders");

const adminOrdersModule = require("../modules/adminOrders");
const adminAuthModule = require("../modules/adminAuth");
const adminUploadsModule = require("../modules/adminUploads");
const adminProductsModule = require("../modules/adminProducts");
const adminProductEditorModule = require("../modules/adminProductEditor");
const adminCatalogModule = require("../modules/adminCatalog");
const adminInfoFilesUploadModule = require("../modules/adminInfoFilesUpload");
const adminRequestsModule = require("../modules/adminRequests");

const { requireAdmin } = require("../middlewares/requireAdmin");

const router = Router();

router.use("/admin/auth", adminAuthModule);

router.use("/admin", requireAdmin);

router.use("/admin/orders", adminOrdersModule);
router.use("/admin/requests", adminRequestsModule);
router.use("/admin/uploads", adminUploadsModule);
router.use("/admin/info-files", adminInfoFilesUploadModule);
router.use("/admin/products", adminProductsModule);
router.use("/admin/product-editor", adminProductEditorModule);
router.use("/admin/catalog", adminCatalogModule);

router.use("/catalog", catalogModule);
router.use("/orders", ordersModule);

module.exports = router;
