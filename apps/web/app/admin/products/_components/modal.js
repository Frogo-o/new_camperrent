export default function Modal({ open, title, children, onClose }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center p-4">
      <button
        type="button"
        onClick={onClose}
        className="absolute inset-0 bg-black/40"
        aria-label="Close modal"
      />
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
        <div className="flex items-center justify-between gap-3 border-b border-slate-100 p-4">
          <div className="text-base font-semibold text-slate-900">{title}</div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-900 shadow-sm transition hover:bg-slate-50"
          >
            Затвори
          </button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}
