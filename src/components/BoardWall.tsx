"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Pushpin from "./Pushpin";
import { timeAgo } from "@/lib/format";
import type { PublicListing } from "@/lib/listings";
import type { FormState } from "@/lib/form-types";
import { initialFormState } from "@/lib/form-types";

type Action = (prev: FormState, formData: FormData) => Promise<FormState>;

/* Raptiye konumları — notlara rastgele çakılmış gibi (indekse göre deterministik,
   SSR/istemci uyumu bozulmasın diye Math.random kullanılmaz). */
const PIN_POS = [
  "left-1/2 -translate-x-1/2",
  "right-5",
  "left-5",
  "left-[30%]",
  "right-[26%]",
  "left-[62%]",
  "right-9",
  "left-9",
];
const PIN_COLORS = ["#2E6FD6", "#3B82E6", "#1E5BB8", "#2563C9"];
const TILTS = [-1.7, 1.2, -0.6, 1.9, -1.2, 0.8, -2.0, 1.5];

const pinPos = (i: number) => PIN_POS[(i * 5 + 2) % PIN_POS.length]!;
const pinColor = (i: number) => PIN_COLORS[(i * 3 + 1) % PIN_COLORS.length]!;
const tilt = (i: number) => TILTS[i % TILTS.length]!;

export default function BoardWall({
  listings,
  query,
  openCreate,
  action,
}: {
  listings: PublicListing[];
  query: string;
  openCreate: boolean;
  action: Action;
}) {
  // tek seferde tek boş pano düzenlenir
  const [editing, setEditing] = useState<number | null>(
    openCreate && !query ? listings.length : null,
  );

  if (query && listings.length === 0) {
    return (
      <div className="rounded-md border-[3px] border-dashed border-ink/35 bg-paper/85 px-6 py-14 text-center shadow-[0_10px_24px_-12px_rgba(34,26,16,0.5)]">
        <h2 className="font-display text-2xl font-semibold text-ink">Bu aramaya uygun ilan yok</h2>
        <p className="mx-auto mt-2 max-w-md text-ink/70">
          Farklı bir kelime deneyebilir ya da{" "}
          <Link href="/" className="font-semibold underline decoration-2 underline-offset-2">
            duvara dönüp
          </Link>{" "}
          boş bir panoya kendi notunu asabilirsin.
        </p>
      </div>
    );
  }

  // 4×3 = 12 pano; ilan arttıkça 4'ün katı olarak büyür, en az 1 boş pano kalır
  const tileCount = query
    ? listings.length
    : Math.max(12, Math.ceil((listings.length + 1) / 4) * 4);

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: tileCount }).map((_, i) =>
        i < listings.length ? (
          <NoteBoard key={listings[i]!.id} listing={listings[i]!} index={i} />
        ) : editing === i ? (
          <EditBoard key={`edit-${i}`} index={i} action={action} onDone={() => setEditing(null)} />
        ) : (
          <EmptyBoard key={`empty-${i}`} index={i} onStart={() => setEditing(i)} />
        ),
      )}
    </div>
  );
}

/* ---------- Ortak: mantar pano kabuğu ---------- */

function Board({ children }: { children: React.ReactNode }) {
  return (
    <article className="relative h-full">
      {/* ahşap çerçeve */}
      <div className="board-frame h-full rounded-lg p-[7px] shadow-[0_16px_28px_-14px_rgba(34,26,16,0.65)]">
        {/* mantar yüzey */}
        <div className="cork h-full rounded-[4px] p-3 shadow-[inset_0_2px_6px_rgba(60,38,16,0.35)] ring-1 ring-inset ring-[#5b3e22]/25">
          {children}
        </div>
      </div>
    </article>
  );
}

/* ---------- Dolu not — yazılan metin olduğu gibi görünür, tıklanmaz ---------- */

function NoteBoard({ listing, index }: { listing: PublicListing; index: number }) {
  // Türetilmiş başlıklar (notun ilk satırı) tekrar gösterilmez; eski yapıdaki
  // gerçek başlıklar nota kalın satır olarak yazılır.
  const flat = (s: string) => s.replace(/\s+/g, " ").trim();
  const showTitle = !!listing.title && !flat(listing.description).startsWith(flat(listing.title));

  return (
    <Board>
      <div
        className="note relative flex h-full min-h-[170px] flex-col px-4 pb-3 pt-7"
        style={{ transform: `rotate(${tilt(index)}deg)` }}
      >
        <Pushpin
          color={pinColor(index)}
          size={26}
          className={`absolute -top-3 ${pinPos(index)} drop-shadow-[2px_3px_2px_rgba(34,26,16,0.3)]`}
        />
        {showTitle ? (
          <h3 className="mb-1 font-display text-base font-semibold leading-snug text-note-ink">
            {listing.title}
          </h3>
        ) : null}
        <p className="whitespace-pre-wrap text-sm leading-relaxed text-note-ink/90">
          {listing.description}
        </p>
        <span className="mt-auto self-end pt-3 text-xs font-medium text-note-ink/50">
          {timeAgo(listing.created_at)}
        </span>
      </div>
    </Board>
  );
}

/* ---------- Boş pano — tıklayınca yazmaya başlanır ---------- */

function EmptyBoard({ index, onStart }: { index: number; onStart: () => void }) {
  return (
    <button
      type="button"
      onClick={onStart}
      aria-label="Boş panoya not yaz"
      className="group block h-full w-full text-left outline-none transition-transform duration-200 hover:-translate-y-1 focus-visible:-translate-y-1"
    >
      <Board>
        <div
          className="note relative flex h-full min-h-[170px] flex-col items-center justify-center px-4 pb-4 pt-7 text-center"
          style={{ transform: `rotate(${tilt(index)}deg)` }}
        >
          <Pushpin
            color="#E5352B"
            size={26}
            className={`absolute -top-3 ${pinPos(index)} drop-shadow-[2px_3px_2px_rgba(34,26,16,0.3)]`}
          />
          <span className="flex h-11 w-11 items-center justify-center rounded-full border-[3px] border-dashed border-note-ink/40 font-display text-2xl font-bold leading-none text-note-ink/60 transition-colors group-hover:border-brand-green group-hover:text-brand-green">
            +
          </span>
          <span className="mt-2.5 font-display font-semibold text-note-ink">Boş pano</span>
          <span className="mt-0.5 text-xs text-note-ink/60">Tıkla, notunu yaz</span>
        </div>
      </Board>
    </button>
  );
}

/* ---------- Yazma modu — aynı pano üzerinde boş kâğıt ---------- */

function EditBoard({
  index,
  action,
  onDone,
}: {
  index: number;
  action: Action;
  onDone: () => void;
}) {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(action, initialFormState);
  const taRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    taRef.current?.focus();
  }, []);

  useEffect(() => {
    if (state.ok) {
      router.refresh();
      onDone();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.ok]);

  return (
    <Board>
      <form action={formAction} className="h-full">
        <div
          className="note relative flex h-full min-h-[230px] flex-col px-4 pb-3 pt-7"
          style={{ transform: `rotate(${tilt(index) * 0.4}deg)` }}
        >
          <Pushpin
            color="#E5352B"
            size={26}
            className={`absolute -top-3 ${pinPos(index)} drop-shadow-[2px_3px_2px_rgba(34,26,16,0.3)]`}
          />

          {/* honeypot — insanlar görmez */}
          <div className="absolute left-[-9999px]" aria-hidden>
            <label htmlFor={`website-${index}`}>Web siteniz</label>
            <input id={`website-${index}`} name="website" type="text" tabIndex={-1} autoComplete="off" />
          </div>

          <textarea
            ref={taRef}
            name="text"
            maxLength={600}
            rows={7}
            onKeyDown={(e) => {
              if (e.key === "Escape") onDone();
            }}
            aria-label="Not metni"
            className="note-lines w-full flex-1 resize-none bg-transparent text-sm text-note-ink outline-none"
          />

          {state.formError ? (
            <p role="alert" className="mt-1 text-xs font-semibold text-brick-dark">
              {state.formError}
            </p>
          ) : null}

          <div className="-mb-1 mt-2 flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={onDone}
              className="-mx-2 px-2 py-2 text-sm font-semibold text-note-ink/60 underline decoration-2 underline-offset-2 hover:text-note-ink"
            >
              Vazgeç
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="rounded-sketch border-2 border-ink bg-brand-green px-5 py-2 text-sm font-bold text-paper shadow-[3px_3px_0_0_#221a10] transition-all hover:-translate-y-0.5 active:translate-y-0 active:shadow-none disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isPending ? "Asılıyor..." : "Paylaş"}
            </button>
          </div>
        </div>
      </form>
    </Board>
  );
}
