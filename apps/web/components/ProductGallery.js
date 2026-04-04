"use client";

import { useEffect, useMemo, useState } from "react";

export default function ProductGallery({ images = [], name }) {
  const sorted = useMemo(() => {
    const arr = Array.isArray(images) ? images.slice() : [];
    arr.sort((a, b) => Number(a?.sortOrder || 0) - Number(b?.sortOrder || 0));
    return arr.filter((x) => x?.url);
  }, [images]);

  const [active, setActive] = useState(0);

  useEffect(() => {
    setActive(0);
  }, [sorted.length]);

  const prev = () => {
    setActive((i) => (i === 0 ? sorted.length - 1 : i - 1));
  };

  const next = () => {
    setActive((i) => (i === sorted.length - 1 ? 0 : i + 1));
  };

  const mainUrl = sorted[active]?.url || sorted[0]?.url || "";

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="relative aspect-[4/3] bg-slate-50">
        {mainUrl ? (
          <img
            src={mainUrl}
            alt={name || ""}
            className="h-full w-full object-contain p-3"
            draggable={false}
          />
        ) : null}

        {sorted.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow hover:bg-white"
            >
              ←
            </button>

            <button
              onClick={next}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow hover:bg-white"
            >
              →
            </button>
          </>
        )}
      </div>

      {sorted.length > 1 && (
        <div className="border-t border-slate-200 bg-white p-3">
          <div className="flex gap-2 overflow-x-auto">
            {sorted.map((img, idx) => (
              <button
                key={img.id || img.url}
                type="button"
                onClick={() => setActive(idx)}
                className={[
                  "relative h-16 w-24 flex-none overflow-hidden rounded-lg border bg-slate-50 shadow-sm transition",
                  idx === active
                    ? "border-sky-500 ring-2 ring-sky-200"
                    : "border-slate-200 hover:border-slate-300",
                ].join(" ")}
              >
                <img
                  src={img.url}
                  alt={name || ""}
                  className="h-full w-full object-contain p-1"
                  draggable={false}
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}