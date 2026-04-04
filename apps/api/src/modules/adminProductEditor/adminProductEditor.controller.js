const service = require("./adminProductEditor.service");

function parseBool(v) {
    if (typeof v === "boolean") return v;
    if (typeof v === "string") {
        if (v.toLowerCase() === "true") return true;
        if (v.toLowerCase() === "false") return false;
    }
    return v;
}

function toIntOrNull(v) {
    if (v === null) return null;
    if (v === undefined) return undefined;
    if (v === "") return null;
    const n = Number(v);
    return Number.isFinite(n) ? Math.trunc(n) : v;
}

function toNumber(v) {
    if (v === undefined) return undefined;
    const n = Number(v);
    return Number.isFinite(n) ? n : v;
}

function cleanPatchBody(body) {
    const allowed = ["name", "slug", "description", "price", "isActive", "categoryId", "brandId", "articleNumber"];
    const out = {};
    for (const k of allowed) {
        if (Object.prototype.hasOwnProperty.call(body, k)) out[k] = body[k];
    }

    if (Object.prototype.hasOwnProperty.call(out, "isActive")) out.isActive = parseBool(out.isActive);
    if (Object.prototype.hasOwnProperty.call(out, "categoryId")) out.categoryId = toIntOrNull(out.categoryId);
    if (Object.prototype.hasOwnProperty.call(out, "brandId")) out.brandId = toIntOrNull(out.brandId);
    if (Object.prototype.hasOwnProperty.call(out, "price")) out.price = toNumber(out.price);

    if (Object.prototype.hasOwnProperty.call(out, "articleNumber")) {
        if (out.articleNumber === "") out.articleNumber = null;
        if (out.articleNumber !== null && out.articleNumber !== undefined) out.articleNumber = String(out.articleNumber);
    }

    return out;
}

function validatePatch(data) {
    const errors = [];

    if ("name" in data && (typeof data.name !== "string" || !data.name.trim())) errors.push("name must be a non-empty string");
    if ("slug" in data && (typeof data.slug !== "string" || !data.slug.trim())) errors.push("slug must be a non-empty string");
    if ("description" in data && typeof data.description !== "string") errors.push("description must be a string");
    if ("price" in data && (typeof data.price !== "number" || !Number.isFinite(data.price) || data.price < 0))
        errors.push("price must be a non-negative number");
    if ("isActive" in data && typeof data.isActive !== "boolean") errors.push("isActive must be boolean");
    if ("categoryId" in data && (typeof data.categoryId !== "number" || !Number.isInteger(data.categoryId) || data.categoryId <= 0))
        errors.push("categoryId must be a positive integer");
    if ("brandId" in data && !(data.brandId === null || (typeof data.brandId === "number" && Number.isInteger(data.brandId) && data.brandId > 0)))
        errors.push("brandId must be a positive integer or null");

    if ("articleNumber" in data) {
        if (!(data.articleNumber === null || (typeof data.articleNumber === "string" && data.articleNumber.trim()))) {
            errors.push("articleNumber must be a non-empty string or null");
        }
        if (typeof data.articleNumber === "string" && data.articleNumber.trim().length > 64) {
            errors.push("articleNumber must be at most 64 characters");
        }
    }

    return errors;
}

async function getBySlug(req, res) {
    try {
        const product = await service.getEditableBySlug(req.params.slug);
        return res.json({ data: product });
    } catch (e) {
        if (e.code === "NOT_FOUND") return res.status(404).json({ message: "Product not found" });
        return res.status(500).json({ message: "Server error" });
    }
}

async function patchBySlug(req, res) {
    try {
        const patch = cleanPatchBody(req.body || {});
        const errors = validatePatch(patch);
        if (errors.length) return res.status(400).json({ message: "Invalid payload", errors });

        const updated = await service.patchBySlug(req.params.slug, patch);
        return res.json({ data: updated });
    } catch (e) {
        if (e.code === "NOT_FOUND") return res.status(404).json({ message: "Product not found" });
        if (e.code === "SLUG_TAKEN") return res.status(409).json({ message: "Slug already exists" });
        if (e.code === "BAD_FK") return res.status(400).json({ message: "Invalid categoryId/brandId" });
        return res.status(500).json({ message: "Server error" });
    }
}

/* =========================
   IMAGES
========================= */

async function postImage(req, res) {
    try {
        const created = await service.addImageBySlug(req.params.slug, req.body);
        return res.status(201).json({ data: created });
    } catch (e) {
        if (e.code === "NOT_FOUND") return res.status(404).json({ message: "Product not found" });
        if (e.code === "BAD_REQUEST") return res.status(400).json({ message: "Invalid payload", errors: e.details || [] });
        return res.status(500).json({ message: "Server error" });
    }
}

async function patchImage(req, res) {
    try {
        const updated = await service.patchImageBySlug(req.params.slug, req.params.imageId, req.body);
        return res.json({ data: updated });
    } catch (e) {
        if (e.code === "NOT_FOUND") return res.status(404).json({ message: "Not found" });
        if (e.code === "BAD_REQUEST") return res.status(400).json({ message: "Invalid payload", errors: e.details || [] });
        return res.status(500).json({ message: "Server error" });
    }
}

async function deleteImage(req, res) {
    try {
        await service.deleteImageBySlug(req.params.slug, req.params.imageId);
        return res.json({ ok: true });
    } catch (e) {
        if (e.code === "NOT_FOUND") return res.status(404).json({ message: "Not found" });
        if (e.code === "BAD_REQUEST") return res.status(400).json({ message: "Invalid payload", errors: e.details || [] });
        return res.status(500).json({ message: "Server error" });
    }
}

async function reorderImages(req, res) {
    try {
        const updated = await service.reorderImagesBySlug(req.params.slug, req.body);
        return res.json({ data: updated });
    } catch (e) {
        if (e.code === "NOT_FOUND") return res.status(404).json({ message: "Product not found" });
        if (e.code === "BAD_REQUEST") return res.status(400).json({ message: "Invalid payload", errors: e.details || [] });
        return res.status(500).json({ message: "Server error" });
    }
}

/* =========================
   INFO FILES
========================= */

async function postInfoFile(req, res) {
    try {
        const created = await service.addInfoFileBySlug(req.params.slug, req.body);
        return res.status(201).json({ data: created });
    } catch (e) {
        if (e.code === "NOT_FOUND") return res.status(404).json({ message: "Product not found" });
        if (e.code === "BAD_REQUEST") return res.status(400).json({ message: "Invalid payload", errors: e.details || [] });
        return res.status(500).json({ message: "Server error" });
    }
}

async function patchInfoFile(req, res) {
    try {
        const updated = await service.patchInfoFileBySlug(req.params.slug, req.params.fileId, req.body);
        return res.json({ data: updated });
    } catch (e) {
        if (e.code === "NOT_FOUND") return res.status(404).json({ message: "Not found" });
        if (e.code === "BAD_REQUEST") return res.status(400).json({ message: "Invalid payload", errors: e.details || [] });
        return res.status(500).json({ message: "Server error" });
    }
}

async function deleteInfoFile(req, res) {
    try {
        await service.deleteInfoFileBySlug(req.params.slug, req.params.fileId);
        return res.json({ ok: true });
    } catch (e) {
        if (e.code === "NOT_FOUND") return res.status(404).json({ message: "Not found" });
        if (e.code === "BAD_REQUEST") return res.status(400).json({ message: "Invalid payload", errors: e.details || [] });
        return res.status(500).json({ message: "Server error" });
    }
}

async function reorderInfoFiles(req, res) {
    try {
        const updated = await service.reorderInfoFilesBySlug(req.params.slug, req.body);
        return res.json({ data: updated });
    } catch (e) {
        if (e.code === "NOT_FOUND") return res.status(404).json({ message: "Product not found" });
        if (e.code === "BAD_REQUEST") return res.status(400).json({ message: "Invalid payload", errors: e.details || [] });
        return res.status(500).json({ message: "Server error" });
    }
}

module.exports = {
    getBySlug,
    patchBySlug,

    postImage,
    patchImage,
    deleteImage,
    reorderImages,

    postInfoFile,
    patchInfoFile,
    deleteInfoFile,
    reorderInfoFiles,
};
