"use client";

// LIEVITA — shared form primitives (Bold Kinetic)
// Panel · Row · Field · Input · KV · SlotBtn

import type { ReactNode } from "react";

export function Panel({ num, title, children }: { num?: string; title: ReactNode; children: ReactNode }) {
  return (
    <section className="bg-bk-white border-2 border-bk-green p-6 md:p-7 mb-5">
      <div className="flex items-baseline gap-3 mb-5">
        {num && (
          <span className="font-display-xl font-bold text-[28px] text-bk-yellow bg-bk-green w-10 h-10 grid place-items-center leading-none">
            {num}
          </span>
        )}
        <h3 className="lv-h3 text-bk-green m-0">{title}</h3>
      </div>
      {children}
    </section>
  );
}

export function Row({ children }: { children: ReactNode }) {
  return <div className="grid md:grid-cols-2 gap-4">{children}</div>;
}

export function Field({ label, error, children }: { label: ReactNode; error?: string; children: ReactNode }) {
  return (
    <label className="block mb-4 last:mb-0">
      <span className="lv-label">{label}</span>
      {children}
      {error && <div className="text-[12px] text-bk-closed mt-1.5 font-semibold">{error}</div>}
    </label>
  );
}

export function Input({
  value,
  onChange,
  ...rest
}: {
  value: string;
  onChange: (v: string) => void;
  [key: string]: unknown;
}) {
  return <input value={value} onChange={(e) => onChange(e.target.value)} className="lv-input" {...rest} />;
}

export function KV({ label, children }: { label: ReactNode; children: ReactNode }) {
  return (
    <div>
      <div className="lv-label">{label}</div>
      <div className="text-bk-ink text-[16px] leading-snug">{children}</div>
    </div>
  );
}

export function SlotBtn({ active, onClick, children }: { active?: boolean; onClick?: () => void; children: ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-3 border-2 font-display uppercase text-[13px] font-semibold tracking-[0.04em] transition-colors ${
        active ? "border-bk-green bg-bk-green text-bk-yellow" : "border-bk-border bg-bk-white text-bk-green hover:border-bk-green"
      }`}
      style={{ borderRadius: 0 }}
    >
      {children}
    </button>
  );
}
