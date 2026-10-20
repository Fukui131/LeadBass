"use client";
import { useEffect, useRef } from "react";
import { pitchName } from "@/lib/music";
export function Fretboard({
  string = 4,
  fret = 0,
  interactive = false,
  onSelect,
  showActive = true,
  disabled = false,
}: {
  string?: number;
  fret?: number;
  interactive?: boolean;
  onSelect?: (s: number, f: number) => void;
  showActive?: boolean;
  disabled?: boolean;
}) {
  return (
    <div className="fretboard-scroll">
      <div className="fretboard">
        <div className="fret-numbers">
          <span />{" "}
          {Array.from({ length: 8 }, (_, i) => (
            <span key={i}>{i === 0 ? "開放弦" : i}</span>
          ))}
        </div>
        {[1, 2, 3, 4].map((s) => (
          <div className={`fret-string string-${s}`} key={s}>
            <span className="string-name">
              {["", "G", "D", "A", "E"][s]}
              <small>{s}弦</small>
            </span>
            {Array.from({ length: 8 }, (_, f) => {
              const active = showActive && s === string && f === fret;
              return interactive ? (
                <button
                  key={f}
                  disabled={disabled}
                  onClick={() => onSelect?.(s, f)}
                  className={`fret-cell ${f === 0 ? "open" : ""} ${active ? "selected" : ""}`}
                  aria-label={`${s}弦の${f === 0 ? "開放弦" : `${f}フレット`}`}
                >
                  <span>{active ? f : ""}</span>
                </button>
              ) : (
                <div
                  key={f}
                  className={`fret-cell ${f === 0 ? "open" : ""} ${active ? "selected" : ""}`}
                >
                  <span>{active ? f : ""}</span>
                </div>
              );
            })}
          </div>
        ))}
        <div className="fret-dots">
          <span />
          {Array.from({ length: 8 }, (_, f) => (
            <span key={f}>{[3, 5, 7].includes(f) ? "●" : ""}</span>
          ))}
        </div>
      </div>
      {!interactive && showActive && (
        <div className="board-caption">
          <span className="active-dot" />
          {string}弦（{["", "G", "D", "A", "E"][string]}）・
          {fret === 0 ? "開放弦" : `${fret}フレット`}{" "}
          <span className="muted">/ 音名 {pitchName(string, fret)}</span>
        </div>
      )}
    </div>
  );
}
export function TabScore({
  notes,
  active = -1,
  compact = false,
}: {
  notes: { string: number; fret: number; beats: number }[];
  active?: number;
  compact?: boolean;
}) {
  const scroll = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = scroll.current;
    const column = root?.querySelector<HTMLElement>(".tab-column.active");
    if (root && column) {
      const relative =
        column.getBoundingClientRect().left - root.getBoundingClientRect().left;
      const left =
        root.scrollLeft +
        relative -
        root.clientWidth / 2 +
        column.clientWidth / 2;
      root.scrollTo({ left: Math.max(0, left), behavior: "instant" });
    }
  }, [active]);
  return (
    <div ref={scroll} className={`tab-scroll ${compact ? "compact" : ""}`}>
      <div
        className="tab-score"
        style={{ minWidth: compact ? 0 : Math.max(420, notes.length * 49) }}
      >
        <div className="tab-labels">
          {["G", "D", "A", "E"].map((s) => (
            <span key={s}>{s}</span>
          ))}
        </div>
        <div className="tab-notes">
          {notes.map((n, i) => (
            <div
              key={i}
              className={`tab-column ${active === i ? "active" : ""}`}
              style={{ flex: n.beats }}
            >
              {[1, 2, 3, 4].map((s) => (
                <div className="tab-line" key={s}>
                  {n.string === s && <span>{n.fret}</span>}
                </div>
              ))}
              <span className="note-duration">
                {n.beats === 2 ? "𝅗𝅥" : n.beats === 0.5 ? "♪" : "♩"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
