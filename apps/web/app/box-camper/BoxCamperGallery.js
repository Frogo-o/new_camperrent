"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function BoxCamperGallery({ images }) {
  const [activeImage, setActiveImage] = useState(null);

  useEffect(() => {
    if (!activeImage) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") setActiveImage(null);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeImage]);

  return (
    <>
      <div className="grid auto-rows-[220px] gap-4 md:grid-cols-4">
        {images.map((image) => (
          <button
            key={image.src}
            type="button"
            onClick={() => setActiveImage(image)}
            className={`group relative overflow-hidden rounded-xl border border-[#dcecff] bg-white shadow-sm outline-none transition focus:ring-4 focus:ring-[#00A6F4]/20 ${
              image.className || ""
            }`}
            aria-label={`Отвори снимка: ${image.alt}`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 768px) 25vw, 100vw"
              className="object-cover transition duration-300 group-hover:scale-[1.03]"
            />
            <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-black/45 px-3 py-2 text-left text-sm font-medium text-white opacity-0 transition group-hover:opacity-100 group-focus:opacity-100">
              Отвори снимката
            </span>
          </button>
        ))}
      </div>

      {activeImage ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setActiveImage(null);
          }}
        >
          <div className="relative h-[82vh] w-full max-w-6xl">
            <Image
              src={activeImage.src}
              alt={activeImage.alt}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>
          <button
            type="button"
            onClick={() => setActiveImage(null)}
            className="absolute right-4 top-4 rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-lg transition hover:bg-slate-100"
            aria-label="Затвори снимката"
          >
            Затвори
          </button>
        </div>
      ) : null}
    </>
  );
}
