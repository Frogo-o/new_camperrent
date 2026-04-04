function notFound(req, res) {
  res.status(404).json({ error: { status: 404, message: "Not found" } });
}

module.exports = { notFound };
