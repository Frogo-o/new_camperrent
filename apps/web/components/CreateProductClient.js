"use client";

import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

function eurToCents(v) {
  const x = String(v || "").replace(",", ".").trim();
  const n = Number(x);
  if (!Number.isFinite(n)) return NaN;
  return Math.round(n * 100);
}

function slugify(v) {
  return String(v || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9\-]/g, "")
    .replace(/\-+/g, "-")
    .replace(/^\-+|\-+$/g, "");
}

function ensureCamperCategoriesAtEnd(list) {
  const arr = Array.isArray(list) ? list.slice() : [];
  const bySlug = new Set(arr.map((x) => String(x?.slug || "").trim()).filter(Boolean));

  const extras = [
    { id: 3, name: "Наем-Кемпер", slug: "camper-rent" },
    { id: 4, name: "Купи-Кемпер", slug: "buy-camper" },
  ];

  for (const c of extras) {
    if (!bySlug.has(c.slug)) arr.push(c);
  }

  return arr;
}

export default function CreateProductClient() {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [priceEur, setPriceEur] = useState("");

  const [articleNumber, setArticleNumber] = useState("");

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  const [categoryId, setCategoryId] = useState("");
  const [brandId, setBrandId] = useState("");
  const [isActive, setIsActive] = useState(true);

  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);

  const [infoFiles, setInfoFiles] = useState([]);
  const [uploadingInfoFiles, setUploadingInfoFiles] = useState(false);

  const [creating, setCreating] = useState(false);

  const priceCents = useMemo(() => eurToCents(priceEur), [priceEur]);

  useEffect(() => {
    let alive = true;

    async function load() {
      try {
        const [cRes, bRes] = await Promise.all([
          fetch("/api/catalog/categories", { cache: "no-store" }),
          fetch("/api/catalog/brands", { cache: "no-store" }),
        ]);

        const cJson = await cRes.json().catch(() => null);
        const bJson = await bRes.json().catch(() => null);

        if (!alive) return;

        const c = ensureCamperCategoriesAtEnd(cJson?.data || []);
        const b = Array.isArray(bJson?.data) ? bJson.data : [];

        setCategories(c);
        setBrands(b);

        if (!categoryId && c.length) setCategoryId(String(c[0].id));
      } catch {
        if (!alive) return;
        toast.error("Не успях да заредя категории/брандове");
      }
    }

    load();
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function normalizeSortOrders(list) {
    const arr = Array.isArray(list) ? list.slice() : [];
    return arr.map((x, idx) => ({ ...x, sortOrder: idx }));
  }

  async function uploadFiles(files) {
    if (!files || files.length === 0) return;

    setUploading(true);
    try {
      const next = images.slice();

      for (const file of Array.from(files)) {
        const fd = new FormData();
        fd.append("file", file);

        const res = await fetch("/api/admin/uploads", {
          method: "POST",
          body: fd,
          cache: "no-store",
        });

        const json = await res.json().catch(() => null);

        if (!res.ok) {
          throw new Error(json?.message || "Грешка при качване на снимка");
        }

        const url = json?.data?.url;
        if (!url) throw new Error("Upload OK, но липсва url в отговора");

        next.push({ url, sortOrder: next.length });
      }

      setImages(normalizeSortOrders(next));
      toast.success("Снимките са качени");
    } catch (e) {
      toast.error(e?.message || "Грешка при качване");
    } finally {
      setUploading(false);
    }
  }

  async function uploadInfoFiles(files) {
    if (!files || files.length === 0) return;

    setUploadingInfoFiles(true);
    try {
      const next = infoFiles.slice();

      for (const file of Array.from(files)) {
        const fd = new FormData();
        fd.append("file", file);

        const res = await fetch("/api/admin/info-files", {
          method: "POST",
          body: fd,
          cache: "no-store",
        });

        const json = await res.json().catch(() => null);

        if (!res.ok) {
          throw new Error(json?.message || "Грешка при качване на файл");
        }

        const dto = json?.data || null;
        const url = dto?.url;
        if (!url) throw new Error("Upload OK, но липсва url в отговора");

        next.push({
          url,
          filename: dto?.filename || "",
          originalName: dto?.originalname || dto?.originalName || file.name || "",
          size: Number(dto?.size || file.size || 0),
          mimetype: dto?.mimetype || file.type || "",
          sortOrder: next.length,
        });
      }

      setInfoFiles(normalizeSortOrders(next));
      toast.success("Файловете са качени");
    } catch (e) {
      toast.error(e?.message || "Грешка при качване");
    } finally {
      setUploadingInfoFiles(false);
    }
  }

  function removeImage(idx) {
    const next = images.filter((_, i) => i !== idx);
    setImages(normalizeSortOrders(next));
  }

  function moveImage(idx, dir) {
    const next = images.slice();
    const j = idx + dir;
    if (j < 0 || j >= next.length) return;
    const tmp = next[idx];
    next[idx] = next[j];
    next[j] = tmp;
    setImages(normalizeSortOrders(next));
  }

  function removeInfoFile(idx) {
    const next = infoFiles.filter((_, i) => i !== idx);
    setInfoFiles(normalizeSortOrders(next));
  }

  function moveInfoFile(idx, dir) {
    const next = infoFiles.slice();
    const j = idx + dir;
    if (j < 0 || j >= next.length) return;
    const tmp = next[idx];
    next[idx] = next[j];
    next[j] = tmp;
    setInfoFiles(normalizeSortOrders(next));
  }

  async function createProduct() {
    if (!name.trim()) return toast.error("Името е задължително");
    if (!slug.trim()) return toast.error("Slug е задължителен");
    if (!categoryId) return toast.error("Избери категория");
    if (!Number.isInteger(priceCents) || priceCents < 0) return toast.error("Невалидна цена");

    if (!articleNumber.trim()) return toast.error("Артикулен номер е задължителен");
    if (images.length === 0) return toast.error("Качи поне 1 снимка");

    setCreating(true);
    try {
      const payload = {
        name: name.trim(),
        slug: slug.trim(),
        description: description.trim(),
        price: priceCents,
        articleNumber: articleNumber.trim(),
        categoryId: Number(categoryId),
        isActive,
        images: normalizeSortOrders(images).map((x) => ({ url: x.url, sortOrder: x.sortOrder })),
      };

      if (brandId) payload.brandId = Number(brandId);

      if (infoFiles.length > 0) {
        payload.infoFiles = normalizeSortOrders(infoFiles).map((x) => ({
          url: x.url,
          sortOrder: x.sortOrder,
          filename: x.filename || undefined,
          originalName: x.originalName || undefined,
          size: Number.isFinite(Number(x.size)) ? Number(x.size) : undefined,
          mimetype: x.mimetype || undefined,
        }));
      }

      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "content-type": "application/json; charset=utf-8" },
        body: JSON.stringify(payload),
        cache: "no-store",
      });

      const json = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(json?.message || "Грешка при създаване на продукт");
      }

      toast.success("Продуктът е добавен");

      setName("");
      setSlug("");
      setDescription("");
      setPriceEur("");
      setArticleNumber("");

      setCategoryId(categories?.[0]?.id ? String(categories[0].id) : "");
      setBrandId("");
      setIsActive(true);
      setImages([]);
      setInfoFiles([]);
    } catch (e) {
      toast.error(e?.message || "Грешка");
    } finally {
      setCreating(false);
    }
  }

  return (
    <div className="mx-auto max-w-4xl p-6">
      <div className="mb-5">
        <h1 className="text-2xl font-bold text-slate-900">Добави продукт</h1>
        <div className="mt-1 text-sm text-slate-600">1) качи снимки → 2) (по желание) качи файлове → 3) създай продукт</div>
      </div>

      <div className="grid gap-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs text-slate-600">Име</label>
            <input
              value={name}
              onChange={(e) => {
                const v = e.target.value;
                setName(v);
                if (!slug.trim()) setSlug(slugify(v));
              }}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm outline-none transition focus:border-slate-300 focus:ring-4 focus:ring-slate-100"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs text-slate-600">Slug</label>
            <input
              value={slug}
              onChange={(e) => setSlug(slugify(e.target.value))}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm outline-none transition focus:border-slate-300 focus:ring-4 focus:ring-slate-100"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs text-slate-600">Артикулен номер</label>
            <input
              value={articleNumber}
              onChange={(e) => setArticleNumber(e.target.value)}
              placeholder="пример: 729630"
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm outline-none transition focus:border-slate-300 focus:ring-4 focus:ring-slate-100"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs text-slate-600">Цена (EUR)</label>
            <input
              value={priceEur}
              onChange={(e) => setPriceEur(e.target.value)}
              inputMode="decimal"
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm outline-none transition focus:border-slate-300 focus:ring-4 focus:ring-slate-100"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs text-slate-600">Категория</label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm outline-none transition focus:border-slate-300 focus:ring-4 focus:ring-slate-100"
            >
              {categories.map((c) => (
                <option key={c.id} value={String(c.id)}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-xs text-slate-600">Бранд (optional)</label>
            <select
              value={brandId}
              onChange={(e) => setBrandId(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm outline-none transition focus:border-slate-300 focus:ring-4 focus:ring-slate-100"
            >
              <option value="">— без бранд —</option>
              {brands.map((b) => (
                <option key={b.id} value={String(b.id)}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <label className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm">
              <input
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                className="h-4 w-4"
              />
              Активен
            </label>
          </div>
        </div>

        <div>
          <label className="mb-1 block text-xs text-slate-600">Описание</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm outline-none transition focus:border-slate-300 focus:ring-4 focus:ring-slate-100"
          />
        </div>

        <div className="grid gap-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="text-sm font-semibold text-slate-900">Снимки</div>

            <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700">
              {uploading ? "Качване..." : "Качи снимки"}
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(e) => uploadFiles(e.target.files)}
                disabled={uploading || creating || uploadingInfoFiles}
              />
            </label>
          </div>

          {images.length ? (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {images.map((img, idx) => (
                <div key={`${img.url}-${idx}`} className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                  <div className="aspect-[4/3] bg-slate-50">
                    <img src={img.url} alt="" className="h-full w-full object-cover" />
                  </div>

                  <div className="flex items-center justify-between gap-2 p-3">
                    <div className="text-xs text-slate-600">sortOrder: {img.sortOrder}</div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => moveImage(idx, -1)}
                        disabled={idx === 0}
                        className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs text-slate-900 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        ↑
                      </button>
                      <button
                        type="button"
                        onClick={() => moveImage(idx, 1)}
                        disabled={idx === images.length - 1}
                        className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs text-slate-900 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        ↓
                      </button>
                      <button
                        type="button"
                        onClick={() => removeImage(idx)}
                        className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs text-slate-900 shadow-sm transition hover:bg-slate-50"
                      >
                        Махни
                      </button>
                    </div>
                  </div>

                  <div className="border-t border-slate-200 px-3 py-2 break-all text-[11px] text-slate-500">
                    {img.url}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-slate-200 p-4 text-sm text-slate-600">
              Няма качени снимки.
            </div>
          )}
        </div>

        <div className="grid gap-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="text-sm font-semibold text-slate-900">Допълнителни файлове (optional)</div>

            <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50">
              {uploadingInfoFiles ? "Качване..." : "Качи файлове"}
              <input
                type="file"
                multiple
                className="hidden"
                onChange={(e) => uploadInfoFiles(e.target.files)}
                disabled={uploadingInfoFiles || creating || uploading}
              />
            </label>
          </div>

          {infoFiles.length ? (
            <div className="grid gap-3">
              {infoFiles.map((f, idx) => (
                <div key={`${f.url}-${idx}`} className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="min-w-0">
                      <div className="truncate text-sm font-semibold text-slate-900">{f.originalName || "Файл"}</div>
                      <div className="mt-0.5 break-all text-xs text-slate-500">{f.url}</div>
                      <div className="mt-1 text-[11px] text-slate-500">
                        sortOrder: {f.sortOrder}
                        {f.mimetype ? ` • ${f.mimetype}` : ""}
                        {Number.isFinite(f.size) && f.size > 0 ? ` • ${f.size} bytes` : ""}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href={f.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs text-slate-900 shadow-sm transition hover:bg-slate-50"
                      >
                        Отвори
                      </a>

                      <button
                        type="button"
                        onClick={() => moveInfoFile(idx, -1)}
                        disabled={idx === 0}
                        className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs text-slate-900 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        ↑
                      </button>

                      <button
                        type="button"
                        onClick={() => moveInfoFile(idx, 1)}
                        disabled={idx === infoFiles.length - 1}
                        className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs text-slate-900 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        ↓
                      </button>

                      <button
                        type="button"
                        onClick={() => removeInfoFile(idx)}
                        className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs text-slate-900 shadow-sm transition hover:bg-slate-50"
                      >
                        Махни
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-slate-200 p-4 text-sm text-slate-600">
              Няма допълнителни файлове.
            </div>
          )}
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={createProduct}
            disabled={uploading || creating || uploadingInfoFiles}
            className={[
              "rounded-lg px-4 py-2 text-sm font-semibold text-white shadow-sm transition",
              uploading || creating || uploadingInfoFiles ? "bg-slate-400" : "bg-sky-600 hover:bg-sky-700",
            ].join(" ")}
          >
            {creating ? "Създаване..." : "Създай продукт"}
          </button>
        </div>
      </div>
    </div>
  );
}
