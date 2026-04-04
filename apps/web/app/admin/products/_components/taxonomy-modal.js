import { useEffect, useMemo, useState } from "react";
import Modal from "./modal";
import PillToggle from "./pill-toggle";
import { validateName, validateSlug } from "./utils";

export default function TaxonomyModal({
  open,
  kind,
  mode,
  initial,
  busy,
  error,
  onClose,
  onSubmit,
}) {
  const title = useMemo(() => {
    const t = kind === "category" ? "Категория" : "Бранд";
    return mode === "create" ? `Добавяне на ${t.toLowerCase()}` : `Редакция на ${t.toLowerCase()}`;
  }, [kind, mode]);

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [localErr, setLocalErr] = useState("");

  useEffect(() => {
    if (!open) return;
    setLocalErr("");
    setName(String(initial?.name || ""));
    setSlug(String(initial?.slug || ""));
    setIsActive(initial?.isActive !== false);
  }, [open, initial]);

  function submit() {
    const nameErr = validateName(name);
    const slugErr = validateSlug(slug);
    const msg = [nameErr, slugErr].filter(Boolean).join(" • ");
    if (msg) {
      setLocalErr(msg);
      return;
    }
    setLocalErr("");
    onSubmit({ name: name.trim(), slug: slug.trim(), isActive: !!isActive });
  }

  const slugPlaceholder = kind === "category" ? "пример: electricity" : "пример: dometic";

  return (
    <Modal open={open} title={title} onClose={onClose}>
      <div className="grid gap-3">
        <div>
          <label className="mb-1 block text-xs text-slate-600">Име</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm outline-none transition focus:border-slate-300 focus:ring-4 focus:ring-slate-100"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs text-slate-600">Slug</label>
          <input
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder={slugPlaceholder}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm outline-none transition focus:border-slate-300 focus:ring-4 focus:ring-slate-100"
          />
        </div>

        <div className="pt-1">
          <PillToggle label={isActive ? "Активно" : "Неактивно"} checked={isActive} onChange={setIsActive} />
        </div>

        {localErr ? <div className="text-sm text-red-700">{localErr}</div> : null}
        {error ? <div className="text-sm text-red-700">{error}</div> : null}

        <button
          type="button"
          disabled={busy}
          onClick={submit}
          className={[
            "rounded-lg px-3 py-2 text-sm font-semibold text-white shadow-sm transition",
            busy ? "bg-slate-300" : "bg-sky-600 hover:bg-sky-700",
          ].join(" ")}
        >
          {busy ? "Запис..." : mode === "create" ? "Създай" : "Запази"}
        </button>
      </div>
    </Modal>
  );
}
