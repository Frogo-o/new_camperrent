"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";

function safeNext(v) {
  if (!v) return "/admin/products";
  if (v.startsWith("/")) return v;
  return "/admin/products";
}


export default function LoginClient() {
  const router = useRouter();
  const sp = useSearchParams();
  const next = useMemo(() => safeNext(sp.get("next")), [sp]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
      e.preventDefault();
    
      const u = username.trim();
      if (!u || !password) {
        toast.error("Попълни потребителско име и парола");
        return;
      }
    
      setLoading(true);
      try {
        const res = await fetch("/api/admin/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: u, password }),
          credentials: "include",
        });
    
        const json = await res.json().catch(() => null);
    
        if (!res.ok) {
          toast.error(json?.message || "Грешни данни за вход");
          return;
        }
    
        toast.success("Успешен вход");
        window.location.assign(next || "/admin/products");
      } catch {
        toast.error("Мрежова грешка. Опитай отново");
      } finally {
        setLoading(false);
      }
    }


  return (
    <div className="mx-auto max-w-6xl p-6">
      <div className="mb-4 text-sm text-slate-600">
        <Link href="/" className="hover:underline">
          Начало
        </Link>
        <span className="mx-2">/</span>
        <span className="text-slate-900">Admin вход</span>
      </div>

      <div className="mx-auto max-w-md">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-bold text-slate-900">Admin вход</h1>
          <p className="mt-2 text-sm text-slate-600">Само за администратори</p>

          <form onSubmit={onSubmit} className="mt-6 grid gap-4">
            <div>
              <label className="mb-1 block text-sm text-slate-700">
                Потребителско име
              </label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm outline-none transition focus:border-slate-300 focus:ring-4 focus:ring-slate-100"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm text-slate-700">Парола</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                autoComplete="current-password"
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm outline-none transition focus:border-slate-300 focus:ring-4 focus:ring-slate-100"
              />
            </div>

            <button
              disabled={loading}
              type="submit"
              className={[
                "mt-2 w-full rounded-lg px-4 py-2 text-sm font-semibold text-white shadow-sm transition",
                loading ? "bg-sky-400" : "bg-sky-600 hover:bg-sky-700",
              ].join(" ")}
            >
              {loading ? "Влизане..." : "Влез"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
