const service = require("./adminRequests.service");

function toInt(v, def) {
  const n = Number(v);
  return Number.isFinite(n) ? Math.floor(n) : def;
}

function safeText(v) {
  return String(v ?? "").trim();
}

async function list(req, res) {
  try {
    const page = toInt(req.query.page, 1);
    const size = toInt(req.query.size, 30);
    const status = safeText(req.query.status) || null;

    const data = await service.list({ page, size, status });
    res.json({ ok: true, ...data });
  } catch (e) {
    res.status(500).json({ ok: false, message: "Server error" });
  }
}

async function getById(req, res) {
  try {
    const id = toInt(req.params.id, NaN);
    if (!Number.isFinite(id)) return res.status(400).json({ ok: false, message: "Invalid id" });

    const data = await service.getById({ id });
    if (!data) return res.status(404).json({ ok: false, message: "Not found" });

    res.json({ ok: true, data });
  } catch (e) {
    res.status(500).json({ ok: false, message: "Server error" });
  }
}

async function updateStatus(req, res) {
  try {
    const id = toInt(req.params.id, NaN);
    const adminStatus = safeText(req.body?.adminStatus);

    if (!Number.isFinite(id)) return res.status(400).json({ ok: false, message: "Invalid id" });

    const updated = await service.updateStatus({ id, adminStatus });
    if (!updated) return res.status(404).json({ ok: false, message: "Not found" });

    res.json({ ok: true, data: updated });
  } catch (e) {
    res.status(400).json({ ok: false, message: "Invalid adminStatus" });
  }
}

module.exports = { list, getById, updateStatus };
