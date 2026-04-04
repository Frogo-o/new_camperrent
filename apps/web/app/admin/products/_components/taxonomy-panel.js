export default function TaxonomyPanel({ title, items = [], busy, onEdit }) {
  const list = Array.isArray(items) ? items : [];

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <div className="text-sm font-semibold text-slate-900">{title}</div>
        <div className="text-xs text-slate-500">{busy ? "..." : ""}</div>
      </div>

      <div className="grid gap-2">
        {list.map((x) => {
          const inactive = x?.isActive === false;

          return (
            <div
              key={x.id}
              className={[
                "flex items-center justify-between gap-3 rounded-lg border p-2",
                inactive ? "border-amber-200 bg-amber-50/40" : "border-slate-100 bg-white",
              ].join(" ")}
            >
              <div className="min-w-0">
                <div className="truncate text-sm font-semibold text-slate-900">{x?.name || "—"}</div>

                <div className="mt-0.5 flex flex-wrap items-center gap-2">
                  <div className="truncate text-xs text-slate-500">{x?.slug || "—"}</div>

                  <span
                    className={[
                      "inline-flex items-center rounded-full border px-2 py-1 text-[11px] leading-none",
                      inactive
                        ? "border-amber-300 bg-amber-50 text-amber-800"
                        : "border-emerald-200 bg-emerald-50 text-emerald-800",
                    ].join(" ")}
                  >
                    {inactive ? "Inactive" : "Active"}
                  </span>
                </div>
              </div>

              <button
                type="button"
                disabled={busy}
                onClick={() => onEdit(x)}
                className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Редактирай
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
