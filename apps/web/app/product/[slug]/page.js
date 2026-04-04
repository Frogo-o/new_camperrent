"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import AddToCartButton from "../../../components/AddToCartButton";
import ProductGallery from "../../../components/ProductGallery";
import OrderNowButton from "../../../components/OrderNowButton";
import { PriceEURWithBGN } from "@/components/Price";

function buildRentPricingFromProduct(p) {
  const raw = p?.rentPricing;
  if (Array.isArray(raw) && raw.length) {
    return raw
      .map((x) => ({
        label: String(x?.label || "").trim(),
        price: String(x?.price || "").trim(),
      }))
      .filter((x) => x.label && x.price);
  }

  const text = String(p?.description || "");
  const lower = text.toLowerCase();

  if (!lower.includes("цени") || !lower.includes("ден")) return [];

  const lines = text
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter(Boolean);

  const out = [];
  for (const line of lines) {
    const m = line.match(/^(.+?)\s+(\d+(?:[.,]\d+)?)\s*лв\.?$/i);
    if (!m) continue;
    const label = m[1].trim().replace(/\s+/g, " ");
    const price = `${m[2].replace(",", ".")} лв.`;
    if (label && price) out.push({ label, price });
  }

  return out;
}

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();

  const slug = useMemo(() => String(params?.slug || "").trim(), [params?.slug]);

  const [loading, setLoading] = useState(true);
  const [p, setP] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let alive = true;

    async function load() {
      if (!slug) return;

      setLoading(true);
      setError("");
      setP(null);

      try {
        const res = await fetch(`/api/catalog/products/${encodeURIComponent(slug)}`, {
          cache: "no-store",
        });

        if (res.status === 404) {
          router.replace("/404");
          return;
        }

        const json = await res.json().catch(() => null);
        if (!res.ok) throw new Error(json?.message || `API error ${res.status}`);

        const prod = json?.data || null;
        if (!alive) return;

        if (!prod) {
          router.replace("/404");
          return;
        }

        setP(prod);
      } catch (e) {
        if (!alive) return;
        setError(String(e?.message || e || "Грешка"));
      } finally {
        if (!alive) return;
        setLoading(false);
      }
    }

    load();

    return () => {
      alive = false;
    };
  }, [slug, router]);

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl p-6">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm text-sm text-slate-600">
          Зареждане...
        </div>
      </div>
    );
  }

  if (!p) {
    return (
      <div className="mx-auto max-w-6xl p-6">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-sm font-semibold text-slate-900">Продуктът не е достъпен</div>
          <div className="mt-1 text-sm text-slate-600">
            {error ? error : "Не е намерен или има проблем при зареждане."}
          </div>
          <div className="mt-4">
            <Link className="text-sm text-sky-700 hover:underline" href="/">
              Върни се към началото
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const imagesAll = Array.isArray(p?.images) ? p.images : [];
  const infoFiles = Array.isArray(p?.infoFiles) ? p.infoFiles : [];
  const firstImg = imagesAll?.[0]?.url || "";

  const categorySlug = String(p?.category?.slug || "");
  const categoryName = String(p?.category?.name || "");

  const isRent = categorySlug === "camper-rent" || categoryName === "Наем-Кемпер";
  const isBuyCamper = categorySlug === "buy-camper" || categoryName === "Купи-Кемпер";
  const shouldShowOrderForm = isRent || isBuyCamper;

  const articleNumber = String(p?.sku || p?.articleNumber || "");
  const rentPricing = isRent ? buildRentPricingFromProduct(p) : [];

  return (
    <div className="mx-auto max-w-6xl p-6">
      <div className="mb-4 text-sm text-slate-600">
        <Link className="hover:underline" href="/">
          Начало
        </Link>
        <span className="mx-2">/</span>
        <span className="text-slate-900">{p.name}</span>
      </div>

      <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
        <div className="lg:sticky lg:top-6">
          <ProductGallery images={imagesAll} name={p.name} />
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h1 className="text-2xl font-bold text-slate-900">{p.name}</h1>

          <div className="mt-2 flex flex-wrap gap-2 text-sm text-slate-600">
            <span>{p.category?.name}</span>
            <span>•</span>
            <span>{p.brand?.name || "Без марка"}</span>
          </div>

          {articleNumber ? <div className="mt-1 text-xs text-slate-500">Арт. № {articleNumber}</div> : null}

          <div className="mt-4">
            <PriceEURWithBGN cents={p.price} />
          </div>

          <div className="mt-4">
            {shouldShowOrderForm ? (
              <OrderNowButton
                mode={isRent ? "rent" : "buy"}
                product={{ id: p.id, name: p.name, articleNumber }}
                pricing={rentPricing}
              />
            ) : (
              <AddToCartButton
                product={{
                  id: p.id,
                  slug: p.slug,
                  name: p.name,
                  price: p.price,
                  imageUrl: firstImg,
                  categorySlug: p?.category?.slug || "",
                  categoryName: p?.category?.name || "",
                  brandName: p?.brand?.name || "",
                  articleNumber,
                }}
                label="Добави в количка"
              />
            )}
          </div>

          {p.description ? (
            <div className="mt-6">
              <div className="text-sm font-semibold text-slate-900">Кратко описание</div>
              <p className="mt-2 whitespace-pre-line text-sm text-slate-700">{p.description}</p>
            </div>
          ) : null}
        </div>
      </div>

      <div className="mt-10 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Допълнителна информация</h2>

        {infoFiles.length === 0 ? (
          <div className="mt-3 text-sm text-slate-500">Няма допълнителни файлове</div>
        ) : (
          <ul className="mt-3 space-y-2">
            {infoFiles.map((f) => (
              <li key={f.id || f.url}>
                <a
                  href={f.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-sky-600 hover:underline"
                >
                  Файл: {f.originalName || "Файл"}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}