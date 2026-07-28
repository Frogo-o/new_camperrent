"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function BoxCamperGallery({ images }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const activeImage = activeIndex === null ? null : images[activeIndex];
  const hasMultipleImages = images.length > 1;

  function closeImage() {
    setActiveIndex(null);
  }

  function showPreviousImage() {
    setActiveIndex((index) => {
      if (index === null) return null;
      return index === 0 ? images.length - 1 : index - 1;
    });
  }

  function showNextImage() {
    setActiveIndex((index) => {
      if (index === null) return null;
      return index === images.length - 1 ? 0 : index + 1;
    });
  }

  useEffect(() => {
    if (!activeImage) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") setActiveIndex(null);
      if (event.key === "ArrowLeft") {
        setActiveIndex((index) => {
          if (index === null) return null;
          return index === 0 ? images.length - 1 : index - 1;
        });
      }
      if (event.key === "ArrowRight") {
        setActiveIndex((index) => {
          if (index === null) return null;
          return index === images.length - 1 ? 0 : index + 1;
        });
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeImage, images.length]);

  return (
    <>
      <div className="grid auto-rows-[220px] gap-4 md:grid-cols-4">
        {images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            onClick={() => setActiveIndex(index)}
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
            if (event.target === event.currentTarget) closeImage();
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
          {hasMultipleImages ? (
            <>
              <button
                type="button"
                onClick={showPreviousImage}
                className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-3xl leading-none text-slate-900 shadow-lg transition hover:bg-white sm:left-6 sm:h-12 sm:w-12"
                aria-label="Предишна снимка"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={showNextImage}
                className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-3xl leading-none text-slate-900 shadow-lg transition hover:bg-white sm:right-6 sm:h-12 sm:w-12"
                aria-label="Следваща снимка"
              >
                ›
              </button>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/65 px-3 py-1 text-sm font-medium text-white">
                {activeIndex + 1} / {images.length}
              </div>
            </>
          ) : null}
          <button
            type="button"
            onClick={closeImage}
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
