"use client";
import { useEffect, useState } from "react";
import { clampBpm } from "@/lib/music";
export function TempoInput({
  value,
  onCommit,
  label,
  disabled = false,
}: {
  value: number;
  onCommit: (value: number) => void;
  label: string;
  disabled?: boolean;
}) {
  const [draft, setDraft] = useState(String(value));
  useEffect(() => setDraft(String(value)), [value]);
  function commit() {
    const next = draft.trim() === "" ? value : clampBpm(Number(draft));
    setDraft(String(next));
    if (next !== value) onCommit(next);
  }
  return (
    <input
      aria-label={label}
      type="number"
      inputMode="numeric"
      min="30"
      max="220"
      value={draft}
      disabled={disabled}
      onChange={(e) => setDraft(e.target.value)}
      onBlur={commit}
      onKeyDown={(e) => {
        if (e.key === "Enter") e.currentTarget.blur();
      }}
    />
  );
}
