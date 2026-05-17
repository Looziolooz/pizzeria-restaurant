"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Icon } from "@/components/ui"
import { SHOP } from "@/lib/data"

const SLOTS = ["12:30", "13:00", "13:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00"]

export default function ReservePage() {
  const today = new Date()
  const days = useMemo(() => Array.from({ length: 14 }, (_, i) => {
    const d = new Date(today.getFullYear(), today.getMonth(), today.getDate() + i)
    return d
  }), [])

  const [date, setDate] = useState(days[0].toISOString().slice(0, 10))
  const [time, setTime] = useState("20:00")
  const [party, setParty] = useState(2)
  const [form, setForm] = useState({ name: "", phone: "", email: "", notes: "", accept: true })
  const [submitted, setSubmitted] = useState(false)
  const [err, setErr] = useState<Record<string, string>>({})

  const submit = () => {
    const e: Record<string, string> = {}
    if (!form.name.trim()) e.name = "Inserisci il tuo nome"
    if (!form.phone.trim() || form.phone.replace(/\D/g, "").length < 8) e.phone = "Telefono non valido"
    if (!form.accept) e.accept = "Devi accettare i termini"
    setErr(e)
    if (Object.keys(e).length === 0) setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="bg-sand">
        <div className="max-w-content mx-auto px-6 md:px-8 py-20 md:py-28 text-center">
          <div className="inline-grid place-items-center w-20 h-20 rounded-full bg-olive/15 text-olive mb-6">
            <Icon name="check" size={36} strokeWidth={2} />
          </div>
          <div className="font-sans text-[11px] tracking-[0.22em] uppercase text-walnut font-medium mb-3">Prenotazione confermata</div>
          <h1 className="font-serif font-medium leading-[1] tracking-[-0.015em] m-0 mb-5" style={{ fontSize: "clamp(40px, 5.5vw, 72px)" }}>
            Ci vediamo <em className="italic text-tomato">presto</em>.
          </h1>
          <p className="font-serif italic text-[19px] text-ink-2 max-w-[560px] mx-auto mb-10">
            Un tavolo per {party} {party === 1 ? "persona" : "persone"} il{" "}
            <strong className="not-italic font-medium text-ink">{new Date(date).toLocaleDateString("it-IT", { weekday: "long", day: "numeric", month: "long" })}</strong>{" "}
            alle <strong className="not-italic font-medium text-ink">{time}</strong>.
            Ti abbiamo mandato la conferma via SMS al numero{" "}
            <strong className="not-italic font-medium text-ink">{form.phone}</strong>.
          </p>
          <div className="inline-grid grid-cols-2 md:grid-cols-4 gap-6 text-left bg-cream rounded-xl2 border border-line p-6 md:p-8 max-w-[680px] mx-auto mb-8">
            <KV label="Nome">{form.name}</KV>
            <KV label="Ospiti">{party}</KV>
            <KV label="Quando">{new Date(date).toLocaleDateString("it-IT")} · {time}</KV>
            <KV label="Riferimento">R-{Math.floor(Math.random() * 900 + 200)}</KV>
          </div>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 border border-ink text-ink font-sans text-[12px] tracking-caps uppercase rounded-full hover:bg-ink hover:text-cream transition-all">
              <Icon name="arrow_l" size={14} /> Home
            </Link>
            <Link href="/menu" className="inline-flex items-center gap-2 px-6 py-3 bg-tomato text-cream font-sans text-[12px] tracking-caps uppercase rounded-full hover:bg-tomato-deep transition-all">
              Vuoi anche ordinare? <Icon name="arrow_r" size={14} />
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-sand">
      <div className="max-w-content mx-auto px-6 md:px-8 py-10 md:py-16">
        <div className="text-center mb-10">
          <div className="font-sans text-[11px] tracking-[0.22em] uppercase text-walnut font-medium mb-3">Prenota un tavolo</div>
          <h1 className="font-serif font-medium leading-[1] tracking-[-0.015em] m-0 mb-3" style={{ fontSize: "clamp(40px, 6vw, 84px)" }}>
            Cena con <em className="italic text-walnut">noi.</em>
          </h1>
          <p className="font-serif italic text-[18px] text-ink-2 max-w-[560px] mx-auto">
            28 coperti, un solo forno, e tutto il tempo che serve. Scegli quando vuoi venire.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-10 lg:gap-14">
          <div className="space-y-5">
            <Panel title="1 · Giorno">
              <div className="grid grid-cols-7 gap-2">
                {days.map(d => {
                  const iso = d.toISOString().slice(0, 10)
                  const active = iso === date
                  return (
                    <button key={iso} onClick={() => setDate(iso)}
                      className={`p-2 rounded-xl border text-center transition-all ${active ? "bg-ink text-cream border-ink" : "border-line text-ink hover:border-ink"}`}>
                      <div className={`font-sans text-[10px] tracking-caps uppercase ${active ? "text-cream/70" : "text-ink-2"}`}>
                        {d.toLocaleDateString("it-IT", { weekday: "short" }).replace(".", "")}
                      </div>
                      <div className="font-serif text-[22px] leading-none mt-1">{d.getDate()}</div>
                      <div className={`font-sans text-[9px] tracking-caps uppercase ${active ? "text-cream/70" : "text-ink-2"}`}>
                        {d.toLocaleDateString("it-IT", { month: "short" }).replace(".", "")}
                      </div>
                    </button>
                  )
                })}
              </div>
            </Panel>

            <Panel title="2 · Ora">
              <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
                {SLOTS.map(t => (
                  <button key={t} onClick={() => setTime(t)}
                    className={`px-3 py-3 rounded-xl border font-sans text-[13px] font-medium transition-all ${time === t ? "bg-ink text-cream border-ink" : "border-line text-ink hover:border-ink"}`}>
                    {t}
                  </button>
                ))}
              </div>
            </Panel>

            <Panel title="3 · Quanti siete">
              <div className="flex items-center gap-3">
                <button onClick={() => setParty(Math.max(1, party - 1))}
                  className="w-11 h-11 rounded-full border border-line grid place-items-center hover:border-ink text-ink">
                  <Icon name="minus" size={16} />
                </button>
                <div className="flex-1 text-center">
                  <div className="font-serif font-medium text-[48px] leading-none text-ink">{party}</div>
                  <div className="font-sans text-[11px] tracking-[0.22em] uppercase text-ink-2 mt-1">{party === 1 ? "persona" : "persone"}</div>
                </div>
                <button onClick={() => setParty(Math.min(12, party + 1))}
                  className="w-11 h-11 rounded-full border border-line grid place-items-center hover:border-ink text-ink">
                  <Icon name="plus" size={16} />
                </button>
              </div>
              {party >= 8 && (
                <div className="mt-4 text-[12px] font-sans text-walnut bg-walnut/8 rounded-xl p-3 flex gap-2">
                  <Icon name="alert" size={14} className="mt-0.5 shrink-0" />
                  <div>Per gruppi di 8+ persone confermeremo via telefono. Considera anche il nostro <a href="#" className="underline">menù degustazione di gruppo</a>.</div>
                </div>
              )}
            </Panel>

            <Panel title="4 · I tuoi dati">
              <div>
                <label className="block font-sans text-[11px] tracking-[0.22em] uppercase text-ink-2 mb-2 font-semibold">Nome e cognome</label>
                <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                  placeholder="Maria Bianchi"
                  className="w-full px-4 py-3 rounded-xl border border-line bg-cream font-sans text-[14px] text-ink focus:outline-none focus:border-ink transition-colors" />
                {err.name && <div className="text-[12px] text-tomato mt-1.5 font-sans">{err.name}</div>}
              </div>
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block font-sans text-[11px] tracking-[0.22em] uppercase text-ink-2 mb-2 font-semibold">Telefono</label>
                  <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
                    placeholder="+39 333 1234567"
                    className="w-full px-4 py-3 rounded-xl border border-line bg-cream font-sans text-[14px] text-ink focus:outline-none focus:border-ink transition-colors" />
                  {err.phone && <div className="text-[12px] text-tomato mt-1.5 font-sans">{err.phone}</div>}
                </div>
                <div>
                  <label className="block font-sans text-[11px] tracking-[0.22em] uppercase text-ink-2 mb-2 font-semibold">Email (opzionale)</label>
                  <input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                    placeholder="maria@example.it" type="email"
                    className="w-full px-4 py-3 rounded-xl border border-line bg-cream font-sans text-[14px] text-ink focus:outline-none focus:border-ink transition-colors" />
                </div>
              </div>
              <div className="mt-4">
                <label className="block font-sans text-[11px] tracking-[0.22em] uppercase text-ink-2 mb-2 font-semibold">Note (allergie, occasioni speciali, ecc.)</label>
                <textarea value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })}
                  rows={3} placeholder="Compleanno, intolleranze, esigenze particolari..."
                  className="w-full px-4 py-3 rounded-xl border border-line bg-cream font-sans text-[14px] text-ink focus:outline-none focus:border-ink resize-none" />
              </div>
              <label className="flex items-start gap-3 mt-4 cursor-pointer">
                <input type="checkbox" checked={form.accept} onChange={e => setForm({ ...form, accept: e.target.checked })} className="mt-0.5 accent-tomato" />
                <span className="font-sans text-[12px] text-ink-2 leading-snug">
                  Confermo di aver letto la <a href="#" className="underline text-ink">privacy policy</a>. Il tavolo verrà mantenuto fino a 20 minuti dopo l&apos;ora prenotata.
                </span>
              </label>
              {err.accept && <div className="text-[12px] text-tomato mt-2 font-sans">{err.accept}</div>}
            </Panel>
          </div>

          <aside>
            <div className="lg:sticky lg:top-28 bg-cream rounded-xl2 border border-line p-6 shadow-[0_8px_32px_rgba(31,38,135,0.06)]">
              <h3 className="font-serif font-medium text-[22px] m-0 mb-5">Riepilogo</h3>
              <div className="space-y-4">
                <KV label="Quando">{new Date(date).toLocaleDateString("it-IT", { weekday: "long", day: "numeric", month: "long" })}</KV>
                <KV label="Ora">{time}</KV>
                <KV label="Ospiti">{party} {party === 1 ? "persona" : "persone"}</KV>
                <KV label="Dove">{SHOP.address}</KV>
              </div>
              <button onClick={submit}
                className="w-full mt-7 inline-flex items-center justify-center gap-2 px-5 py-4 bg-tomato text-cream font-sans font-medium text-[12px] tracking-caps uppercase rounded-full hover:bg-tomato-deep transition-colors">
                <Icon name="utensils" size={14} /> Conferma prenotazione
              </button>
              <div className="text-center font-sans text-[11px] text-ink-2 mt-3">Gratis · senza pagamento</div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="bg-cream rounded-xl2 border border-line p-6 md:p-7">
      <h3 className="font-serif font-medium text-[20px] m-0 mb-5 text-ink">{title}</h3>
      {children}
    </section>
  )
}

function KV({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="font-sans text-[10px] tracking-[0.22em] uppercase text-walnut font-semibold mb-1.5">{label}</div>
      <div className="font-serif text-[18px] text-ink leading-snug">{children}</div>
    </div>
  )
}
