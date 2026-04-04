"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

function centsToEurString(cents) {
  const n = Number(cents);
  if (!Number.isFinite(n)) return "";
  return (n / 100).toFixed(2);
}

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

function moveItem(arr, from, to) {
  if (from === to) return arr.slice();
  if (from < 0 || to < 0) return arr.slice();
  if (from >= arr.length || to >= arr.length) return arr.slice();
  const copy = arr.slice();
  const [x] = copy.splice(from, 1);
  copy.splice(to, 0, x);
  return copy;
}

export default function EditProductClient() {
  const params = useParams();
  const router = useRouter();
  const currentSlug = useMemo(() => String(params.slug || ""), [params.slug]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [priceEur, setPriceEur] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [brandId, setBrandId] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [articleNumber, setArticleNumber] = useState("");

  const [images, setImages] = useState([]);
  const [imgAdding, setImgAdding] = useState(false);
  const [imgUpdatingId, setImgUpdatingId] = useState(null);
  const [imgDeletingId, setImgDeletingId] = useState(null);
  const [newImageUrl, setNewImageUrl] = useState("");
  const [imgUploading, setImgUploading] = useState(false);

  const [infoFiles, setInfoFiles] = useState([]);
  const [infoUploading, setInfoUploading] = useState(false);
  const [infoLinking, setInfoLinking] = useState(false);
  const [infoDeletingId, setInfoDeletingId] = useState(null);
  const [newInfoUrl, setNewInfoUrl] = useState("");

  useEffect(() => {
    let alive = true;

    async function loadMeta() {
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
      } catch {
        if (!alive) return;
        toast.error("Не успях да заредя категории/брандове");
      }
    }

    loadMeta();
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    let alive = true;

    async function loadProduct() {
      setLoading(true);
      try {
        const res = await fetch(`/api/admin/product-editor/${encodeURIComponent(currentSlug)}`, {
          cache: "no-store",
        });

        const json = await res.json().catch(() => null);
        if (!res.ok) throw new Error(json?.message || "Грешка при зареждане на продукта");

        const p = json?.data ?? json;

        if (!alive) return;

        setName(String(p?.name || ""));
        setSlug(String(p?.slug || ""));
        setDescription(String(p?.description || ""));
        setPriceEur(centsToEurString(p?.price));
        setIsActive(Boolean(p?.isActive));
        setCategoryId(p?.categoryId ? String(p.categoryId) : "");
        setBrandId(p?.brandId ? String(p.brandId) : "");
        setArticleNumber(String(p?.articleNumber || ""));

        const imgs = Array.isArray(p?.images) ? p.images : [];
        setImages(
          imgs
            .slice()
            .sort(
              (a, b) =>
                (Number(a?.sortOrder) || 0) - (Number(b?.sortOrder) || 0) ||
                (Number(a?.id) || 0) - (Number(b?.id) || 0)
            )
            .map((x) => ({
              id: x.id,
              url: String(x.url || ""),
              sortOrder: Number.isInteger(x.sortOrder) ? x.sortOrder : 0,
            }))
        );

        const files = Array.isArray(p?.infoFiles) ? p.infoFiles : [];
        setInfoFiles(
          files
            .slice()
            .sort(
              (a, b) =>
                (Number(a?.sortOrder) || 0) - (Number(b?.sortOrder) || 0) ||
                (Number(a?.id) || 0) - (Number(b?.id) || 0)
            )
            .map((x) => ({
              id: x.id,
              url: String(x.url || ""),
              sortOrder: Number.isInteger(x.sortOrder) ? x.sortOrder : 0,
              originalName: String(x.originalName || x.originalname || ""),
              filename: String(x.filename || ""),
              mimetype: String(x.mimetype || ""),
              size: Number(x.size || 0),
            }))
        );
      } catch (e) {
        if (!alive) return;
        toast.error(e?.message || "Грешка при зареждане");
      } finally {
        if (!alive) return;
        setLoading(false);
      }
    }

    if (currentSlug) loadProduct();

    return () => {
      alive = false;
    };
  }, [currentSlug]);

  async function saveProduct() {
    if (!name.trim()) return toast.error("Името е задължително");
    if (!slug.trim()) return toast.error("Slug е задължителен");
    if (!categoryId) return toast.error("Избери категория");

    const priceCents = eurToCents(priceEur);
    if (!Number.isInteger(priceCents) || priceCents < 0) return toast.error("Невалидна цена");

    setSaving(true);
    try {
      const payload = {
        name: name.trim(),
        slug: slug.trim(),
        description: description.trim(),
        price: priceCents,
        isActive,
        categoryId: Number(categoryId),
        brandId: brandId ? Number(brandId) : null,
        articleNumber: articleNumber.trim() ? articleNumber.trim() : null,
      };

      const res = await fetch(`/api/admin/product-editor/${encodeURIComponent(currentSlug)}`, {
        method: "PATCH",
        headers: { "content-type": "application/json; charset=utf-8" },
        body: JSON.stringify(payload),
        cache: "no-store",
      });

      const json = await res.json().catch(() => null);
      if (!res.ok) throw new Error(json?.message || "Грешка при запазване");

      toast.success("Запазено");

      const updated = json?.data ?? json;
      const newSlug = String(updated?.slug || "");
      if (newSlug && newSlug !== currentSlug) {
        router.replace(`/admin/edit-product/${newSlug}`);
      }
    } catch (e) {
      toast.error(e?.message || "Грешка");
    } finally {
      setSaving(false);
    }
  }

  async function addImage() {
    const url = String(newImageUrl || "").trim();
    if (!url) return toast.error("Линкът към снимката е задължителен");

    setImgAdding(true);
    try {
      const res = await fetch(`/api/admin/product-editor/${encodeURIComponent(currentSlug)}/images`, {
        method: "POST",
        headers: { "content-type": "application/json; charset=utf-8" },
        body: JSON.stringify({ url, sortOrder: images.length }),
        cache: "no-store",
      });

      const json = await res.json().catch(() => null);
      if (!res.ok) throw new Error(json?.message || "Грешка при добавяне на снимка");

      setNewImageUrl("");
      toast.success("Добавена снимка");

      const img = json?.data;
      if (img?.id) {
        setImages((prev) =>
          prev.concat({
            id: img.id,
            url: String(img.url || url),
            sortOrder: Number.isInteger(img.sortOrder) ? img.sortOrder : prev.length,
          })
        );
      } else {
        router.refresh();
      }
    } catch (e) {
      toast.error(e?.message || "Грешка");
    } finally {
      setImgAdding(false);
    }
  }

  async function uploadFiles(fileList) {
    const files = fileList ? Array.from(fileList) : [];
    if (!files.length) return;

    setImgUploading(true);
    try {
      for (const file of files) {
        const fd = new FormData();
        fd.append("file", file);

        const upRes = await fetch("/api/admin/uploads", {
          method: "POST",
          body: fd,
          cache: "no-store",
        });

        const upJson = await upRes.json().catch(() => null);
        if (!upRes.ok) throw new Error(upJson?.message || "Грешка при качване на снимка");

        const url = upJson?.data?.url;
        if (!url) throw new Error("Upload OK, но липсва url в отговора");

        const res = await fetch(`/api/admin/product-editor/${encodeURIComponent(currentSlug)}/images`, {
          method: "POST",
          headers: { "content-type": "application/json; charset=utf-8" },
          body: JSON.stringify({ url, sortOrder: images.length }),
          cache: "no-store",
        });

        const json = await res.json().catch(() => null);
        if (!res.ok) throw new Error(json?.message || "Грешка при добавяне на снимка към продукта");

        const img = json?.data;
        if (img?.id) {
          setImages((prev) =>
            prev.concat({
              id: img.id,
              url: String(img.url || url),
              sortOrder: Number.isInteger(img.sortOrder) ? img.sortOrder : prev.length,
            })
          );
        } else {
          router.refresh();
        }
      }

      toast.success("Снимките са качени");
    } catch (e) {
      toast.error(e?.message || "Грешка при качване");
    } finally {
      setImgUploading(false);
    }
  }

  async function saveImageUrl(imageId, nextUrl) {
    const url = String(nextUrl || "").trim();
    if (!url) return toast.error("URL не може да е празен");

    setImgUpdatingId(imageId);
    try {
      const res = await fetch(
        `/api/admin/product-editor/${encodeURIComponent(currentSlug)}/images/${encodeURIComponent(String(imageId))}`,
        {
          method: "PATCH",
          headers: { "content-type": "application/json; charset=utf-8" },
          body: JSON.stringify({ url }),
          cache: "no-store",
        }
      );

      const json = await res.json().catch(() => null);
      if (!res.ok) throw new Error(json?.message || "Грешка при редакция на снимка");

      const updated = json?.data;
      setImages((prev) => prev.map((x) => (x.id === imageId ? { ...x, url: String(updated?.url || url) } : x)));

      toast.success("Снимката е обновена");
    } catch (e) {
      toast.error(e?.message || "Грешка");
    } finally {
      setImgUpdatingId(null);
    }
  }

  async function deleteImage(imageId) {
    setImgDeletingId(imageId);
    try {
      const res = await fetch(
        `/api/admin/product-editor/${encodeURIComponent(currentSlug)}/images/${encodeURIComponent(String(imageId))}`,
        { method: "DELETE", cache: "no-store" }
      );

      const json = await res.json().catch(() => null);
      if (!res.ok) throw new Error(json?.message || "Грешка при изтриване на снимка");

      setImages((prev) => prev.filter((x) => x.id !== imageId));
      toast.success("Снимката е изтрита");
    } catch (e) {
      toast.error(e?.message || "Грешка");
    } finally {
      setImgDeletingId(null);
    }
  }

  async function persistReorder(nextImages) {
    const items = nextImages.map((x, idx) => ({ id: x.id, sortOrder: idx }));

    const res = await fetch(`/api/admin/product-editor/${encodeURIComponent(currentSlug)}/images/reorder`, {
      method: "PUT",
      headers: { "content-type": "application/json; charset=utf-8" },
      body: JSON.stringify({ items }),
      cache: "no-store",
    });

    const json = await res.json().catch(() => null);
    if (!res.ok) throw new Error(json?.message || "Грешка при пренареждане");
  }

  async function moveUp(idx) {
    if (idx <= 0) return;
    const next = moveItem(images, idx, idx - 1).map((x, i) => ({ ...x, sortOrder: i }));
    setImages(next);
    try {
      await persistReorder(next);
      toast.success("Пренаредено");
    } catch (e) {
      toast.error(e?.message || "Грешка при пренареждане");
      router.refresh();
    }
  }

  async function moveDown(idx) {
    if (idx >= images.length - 1) return;
    const next = moveItem(images, idx, idx + 1).map((x, i) => ({ ...x, sortOrder: i }));
    setImages(next);
    try {
      await persistReorder(next);
      toast.success("Пренаредено");
    } catch (e) {
      toast.error(e?.message || "Грешка при пренареждане");
      router.refresh();
    }
  }

  async function uploadInfoFiles(fileList) {
    const files = fileList ? Array.from(fileList) : [];
    if (!files.length) return;

    setInfoUploading(true);
    try {
      for (const file of files) {
        const fd = new FormData();
        fd.append("file", file);

        const upRes = await fetch("/api/admin/info-files", {
          method: "POST",
          body: fd,
          cache: "no-store",
        });

        const upJson = await upRes.json().catch(() => null);
        if (!upRes.ok) throw new Error(upJson?.message || "Грешка при качване на файл");

        const dto = upJson?.data || null;
        const url = dto?.url;
        if (!url) throw new Error("Upload OK, но липсва url в отговора");

        const linkRes = await fetch(`/api/admin/product-editor/${encodeURIComponent(currentSlug)}/info-files`, {
          method: "POST",
          headers: { "content-type": "application/json; charset=utf-8" },
          body: JSON.stringify({
            url,
            sortOrder: infoFiles.length,
            filename: dto?.filename || "",
            originalName: dto?.originalname || "",
            mimetype: dto?.mimetype || "",
            size: dto?.size || 0,
          }),
          cache: "no-store",
        });

        const linkJson = await linkRes.json().catch(() => null);
        if (!linkRes.ok) throw new Error(linkJson?.message || "Грешка при добавяне на файл към продукта");

        const created = linkJson?.data;
        if (created?.id) {
          setInfoFiles((prev) =>
            prev.concat({
              id: created.id,
              url: String(created.url || url),
              sortOrder: Number.isInteger(created.sortOrder) ? created.sortOrder : prev.length,
              filename: String(created.filename || dto?.filename || ""),
              originalName: String(created.originalName || created.originalname || dto?.originalname || ""),
              mimetype: String(created.mimetype || dto?.mimetype || ""),
              size: Number(created.size || dto?.size || 0),
            })
          );
        } else {
          router.refresh();
        }
      }

      toast.success("Файловете са качени");
    } catch (e) {
      toast.error(e?.message || "Грешка при качване");
    } finally {
      setInfoUploading(false);
    }
  }

  async function addInfoFileByUrl() {
    const url = String(newInfoUrl || "").trim();
    if (!url) return toast.error("URL е задължителен");

    setInfoLinking(true);
    try {
      const res = await fetch(`/api/admin/product-editor/${encodeURIComponent(currentSlug)}/info-files`, {
        method: "POST",
        headers: { "content-type": "application/json; charset=utf-8" },
        body: JSON.stringify({ url, sortOrder: infoFiles.length }),
        cache: "no-store",
      });

      const json = await res.json().catch(() => null);
      if (!res.ok) throw new Error(json?.message || "Грешка при добавяне на файл");

      const created = json?.data;
      if (created?.id) {
        setInfoFiles((prev) =>
          prev.concat({
            id: created.id,
            url: String(created.url || url),
            sortOrder: Number.isInteger(created.sortOrder) ? created.sortOrder : prev.length,
            filename: String(created.filename || ""),
            originalName: String(created.originalName || created.originalname || ""),
            mimetype: String(created.mimetype || ""),
            size: Number(created.size || 0),
          })
        );
      } else {
        router.refresh();
      }

      setNewInfoUrl("");
      toast.success("Добавен файл");
    } catch (e) {
      toast.error(e?.message || "Грешка");
    } finally {
      setInfoLinking(false);
    }
  }

  async function deleteInfoFile(infoId) {
    setInfoDeletingId(infoId);
    try {
      const res = await fetch(
        `/api/admin/product-editor/${encodeURIComponent(currentSlug)}/info-files/${encodeURIComponent(String(infoId))}`,
        { method: "DELETE", cache: "no-store" }
      );

      const json = await res.json().catch(() => null);
      if (!res.ok) throw new Error(json?.message || "Грешка при изтриване на файл");

      setInfoFiles((prev) => prev.filter((x) => x.id !== infoId));
      toast.success("Файлът е изтрит");
    } catch (e) {
      toast.error(e?.message || "Грешка");
    } finally {
      setInfoDeletingId(null);
    }
  }

  async function persistInfoReorder(nextFiles) {
    const items = nextFiles.map((x, idx) => ({ id: x.id, sortOrder: idx }));

    const res = await fetch(`/api/admin/product-editor/${encodeURIComponent(currentSlug)}/info-files/reorder`, {
      method: "PUT",
      headers: { "content-type": "application/json; charset=utf-8" },
      body: JSON.stringify({ items }),
      cache: "no-store",
    });

    const json = await res.json().catch(() => null);
    if (!res.ok) throw new Error(json?.message || "Грешка при пренареждане на файлове");
  }

  async function moveInfoUp(idx) {
    if (idx <= 0) return;
    const next = moveItem(infoFiles, idx, idx - 1).map((x, i) => ({ ...x, sortOrder: i }));
    setInfoFiles(next);
    try {
      await persistInfoReorder(next);
      toast.success("Пренаредено");
    } catch (e) {
      toast.error(e?.message || "Грешка при пренареждане");
      router.refresh();
    }
  }

  async function moveInfoDown(idx) {
    if (idx >= infoFiles.length - 1) return;
    const next = moveItem(infoFiles, idx, idx + 1).map((x, i) => ({ ...x, sortOrder: i }));
    setInfoFiles(next);
    try {
      await persistInfoReorder(next);
      toast.success("Пренаредено");
    } catch (e) {
      toast.error(e?.message || "Грешка при пренареждане");
      router.refresh();
    }
  }

  const disabled =
    loading ||
    saving ||
    imgAdding ||
    imgUploading ||
    infoUploading ||
    infoLinking ||
    imgUpdatingId !== null ||
    imgDeletingId !== null ||
    infoDeletingId !== null;

  return (
    <div className="mx-auto max-w-4xl p-6">
      <div className="mb-5">
        <h1 className="text-2xl font-bold text-slate-900">Редактирай продукт</h1>
        <div className="mt-1 text-sm text-slate-600">Зареждане по slug → редакция → запазване</div>
      </div>

      <div className="grid gap-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="text-sm text-slate-600">
            Текущ slug: <span className="font-semibold text-slate-900">{currentSlug}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => router.back()}
              className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
              disabled={disabled}
            >
              Назад
            </button>

            <button
              type="button"
              onClick={() => router.refresh()}
              className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
              disabled={disabled}
            >
              Refresh
            </button>
          </div>
        </div>

        {loading ? (
          <div className="rounded-lg border border-dashed border-slate-200 p-4 text-sm text-slate-600">Зареждане...</div>
        ) : (
          <>
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
                  disabled={disabled}
                />
              </div>

              <div>
                <label className="mb-1 block text-xs text-slate-600">Slug</label>
                <input
                  value={slug}
                  onChange={(e) => setSlug(slugify(e.target.value))}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm outline-none transition focus:border-slate-300 focus:ring-4 focus:ring-slate-100"
                  disabled={disabled}
                />
              </div>

              <div>
                <label className="mb-1 block text-xs text-slate-600">Цена (EUR)</label>
                <input
                  value={priceEur}
                  onChange={(e) => setPriceEur(e.target.value)}
                  inputMode="decimal"
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm outline-none transition focus:border-slate-300 focus:ring-4 focus:ring-slate-100"
                  disabled={disabled}
                />
                <div className="mt-1 text-[11px] text-slate-500">Ще се запише като cents в бекенда.</div>
              </div>

              <div>
                <label className="mb-1 block text-xs text-slate-600">Артикулен номер</label>
                <input
                  value={articleNumber}
                  onChange={(e) => setArticleNumber(e.target.value)}
                  placeholder="напр. 729630 / ABC-123"
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm outline-none transition focus:border-slate-300 focus:ring-4 focus:ring-slate-100"
                  disabled={disabled}
                />
                <div className="mt-1 text-[11px] text-slate-500">Ако е празно → няма да се запише.</div>
              </div>

              <div>
                <label className="mb-1 block text-xs text-slate-600">Категория</label>
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  title={categories.find((c) => String(c.id) === String(categoryId))?.name || ""}
                  className="w-full max-w-full truncate rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm outline-none transition focus:border-slate-300 focus:ring-4 focus:ring-slate-100"
                  disabled={disabled}
                >
                  {!categoryId ? <option value="">— избери —</option> : null}
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
                  title={brands.find((b) => String(b.id) === String(brandId))?.name || ""}
                  className="w-full max-w-full truncate rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm outline-none transition focus:border-slate-300 focus:ring-4 focus:ring-slate-100"
                  disabled={disabled}
                >
                  <option value="">— без бранд —</option>
                  {brands.map((b) => (
                    <option key={b.id} value={String(b.id)} title={b.name}>
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
                    disabled={disabled}
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
                disabled={disabled}
              />
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold text-slate-900">Снимки</div>
                  <div className="text-xs text-slate-600">Качвай от компютър или добавяй URL</div>
                </div>

                <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700">
                  {imgUploading ? "Качване..." : "Качи снимки"}
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={(e) => uploadFiles(e.target.files)}
                    disabled={disabled}
                  />
                </label>
              </div>

              <div className="mb-3 flex flex-col gap-2 sm:flex-row">
                <input
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  placeholder="https://....jpg"
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm outline-none transition focus:border-slate-300 focus:ring-4 focus:ring-slate-100"
                  disabled={disabled}
                />
                <button
                  type="button"
                  onClick={addImage}
                  disabled={disabled || !newImageUrl.trim()}
                  className={[
                    "rounded-lg px-4 py-2 text-sm font-semibold text-white shadow-sm transition",
                    disabled || !newImageUrl.trim() ? "bg-slate-400" : "bg-sky-600 hover:bg-sky-700",
                  ].join(" ")}
                >
                  {imgAdding ? "Добавяне..." : "Добави"}
                </button>
              </div>

              {images.length === 0 ? (
                <div className="rounded-lg border border-dashed border-slate-200 p-3 text-sm text-slate-600">Няма снимки.</div>
              ) : (
                <div className="grid gap-3">
                  {images.map((img, idx) => (
                    <ImageRow
                      key={img.id}
                      img={img}
                      idx={idx}
                      total={images.length}
                      disabled={disabled}
                      isBusy={imgUpdatingId === img.id || imgDeletingId === img.id}
                      onMoveUp={() => moveUp(idx)}
                      onMoveDown={() => moveDown(idx)}
                      onSave={(nextUrl) => saveImageUrl(img.id, nextUrl)}
                      onDelete={() => deleteImage(img.id)}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold text-slate-900">Допълнителни файлове (optional)</div>
                  <div className="text-xs text-slate-600">PDF, ZIP, DOCX и т.н.</div>
                </div>

                <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50">
                  {infoUploading ? "Качване..." : "Качи файлове"}
                  <input
                    type="file"
                    multiple
                    className="hidden"
                    onChange={(e) => uploadInfoFiles(e.target.files)}
                    disabled={disabled}
                  />
                </label>
              </div>

              <div className="mb-3 flex flex-col gap-2 sm:flex-row">
                <input
                  value={newInfoUrl}
                  onChange={(e) => setNewInfoUrl(e.target.value)}
                  placeholder="https://...pdf"
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm outline-none transition focus:border-slate-300 focus:ring-4 focus:ring-slate-100"
                  disabled={disabled}
                />
                <button
                  type="button"
                  onClick={addInfoFileByUrl}
                  disabled={disabled || !newInfoUrl.trim()}
                  className={[
                    "rounded-lg px-4 py-2 text-sm font-semibold text-white shadow-sm transition",
                    disabled || !newInfoUrl.trim() ? "bg-slate-400" : "bg-sky-600 hover:bg-sky-700",
                  ].join(" ")}
                >
                  {infoLinking ? "Добавяне..." : "Добави"}
                </button>
              </div>

              {infoFiles.length === 0 ? (
                <div className="rounded-lg border border-dashed border-slate-200 p-3 text-sm text-slate-600">
                  Няма допълнителни файлове.
                </div>
              ) : (
                <div className="grid gap-3">
                  {infoFiles.map((f, idx) => (
                    <InfoFileRow
                      key={f.id}
                      file={f}
                      idx={idx}
                      total={infoFiles.length}
                      disabled={disabled}
                      isBusy={infoDeletingId === f.id}
                      onMoveUp={() => moveInfoUp(idx)}
                      onMoveDown={() => moveInfoDown(idx)}
                      onDelete={() => deleteInfoFile(f.id)}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={saveProduct}
                disabled={disabled}
                className={[
                  "rounded-lg px-4 py-2 text-sm font-semibold text-white shadow-sm transition",
                  disabled ? "bg-slate-400" : "bg-sky-600 hover:bg-sky-700",
                ].join(" ")}
              >
                {saving ? "Запазване..." : "Запази промените"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function ImageRow({ img, idx, total, disabled, isBusy, onMoveUp, onMoveDown, onSave, onDelete }) {
  const [value, setValue] = useState(img.url);

  useEffect(() => {
    setValue(img.url);
  }, [img.url]);

  const dirty = value.trim() !== String(img.url || "").trim();

  return (
    <div className="rounded-xl border border-slate-200 p-3">
      <div className="grid gap-3 sm:grid-cols-[120px_1fr]">
        <div className="h-[90px] w-[120px] overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={img.url} alt="" className="h-full w-full object-cover" />
        </div>

        <div className="grid gap-2">
          <div className="text-xs text-slate-500">
            ID: {img.id} • sort: {idx}
          </div>

          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition focus:border-slate-300 focus:ring-4 focus:ring-slate-100"
            disabled={disabled || isBusy}
          />

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={onMoveUp}
              disabled={disabled || isBusy || idx === 0}
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-900 shadow-sm hover:bg-slate-50 disabled:opacity-60"
            >
              Up
            </button>
            <button
              type="button"
              onClick={onMoveDown}
              disabled={disabled || isBusy || idx === total - 1}
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-900 shadow-sm hover:bg-slate-50 disabled:opacity-60"
            >
              Down
            </button>

            <div className="flex-1" />

            <button
              type="button"
              onClick={() => onSave(value)}
              disabled={disabled || isBusy || !dirty}
              className="rounded-lg bg-sky-600 px-3 py-2 text-xs font-semibold text-white shadow-sm hover:bg-sky-700 disabled:bg-slate-400"
            >
              Save URL
            </button>

            <button
              type="button"
              onClick={onDelete}
              disabled={disabled || isBusy}
              className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-700 shadow-sm hover:bg-rose-100 disabled:opacity-60"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoFileRow({ file, idx, total, disabled, isBusy, onMoveUp, onMoveDown, onDelete }) {
  return (
    <div className="rounded-xl border border-slate-200 p-3">
      <div className="grid gap-2">
        <div className="text-xs text-slate-500">
          ID: {file.id} • sort: {idx}
        </div>

        <div className="min-w-0">
          <div className="truncate text-sm font-semibold text-slate-900">{file.originalName || file.filename || "Файл"}</div>
          <div className="mt-0.5 break-all text-xs text-slate-500">{file.url}</div>
          <div className="mt-1 text-[11px] text-slate-500">
            {file.mimetype ? ` ${file.mimetype}` : ""}
            {Number.isFinite(file.size) && file.size > 0 ? ` • ${file.size} bytes` : ""}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <a
            href={file.url}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-900 shadow-sm hover:bg-slate-50"
          >
            Отвори
          </a>

          <button
            type="button"
            onClick={onMoveUp}
            disabled={disabled || isBusy || idx === 0}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-900 shadow-sm hover:bg-slate-50 disabled:opacity-60"
          >
            Up
          </button>

          <button
            type="button"
            onClick={onMoveDown}
            disabled={disabled || isBusy || idx === total - 1}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-900 shadow-sm hover:bg-slate-50 disabled:opacity-60"
          >
            Down
          </button>

          <div className="flex-1" />

          <button
            type="button"
            onClick={onDelete}
            disabled={disabled || isBusy}
            className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-700 shadow-sm hover:bg-rose-100 disabled:opacity-60"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
