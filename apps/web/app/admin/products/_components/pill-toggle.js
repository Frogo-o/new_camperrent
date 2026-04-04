export default function PillToggle({ label, checked, onChange }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={[
        "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm shadow-sm transition",
        checked
          ? "border-sky-200 bg-sky-50 text-sky-900"
          : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
      ].join(" ")}
    >
      <span className={["h-2.5 w-2.5 rounded-full", checked ? "bg-sky-500" : "bg-slate-300"].join(" ")} />
      {label}
    </button>
  );
}
