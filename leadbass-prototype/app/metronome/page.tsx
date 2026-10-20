"use client";
import { useRef, useState } from "react";
import { TempoInput } from "@/components/tempo-input";
import {
  Minus,
  Pause,
  Play,
  Plus,
  Timer,
  Volume2,
  VolumeX,
  Hand,
} from "lucide-react";
import { useTransport } from "@/components/use-transport";
import { clampBpm } from "@/lib/music";
export default function Metronome() {
  const [bpm, setBpm] = useState(60),
    [sound, setSound] = useState(true),
    [meter, setMeter] = useState(4);
  const t = useTransport(bpm, sound, meter);
  const taps = useRef<number[]>([]);
  const beat = Math.floor((t.elapsed * bpm) / 60000) % meter;
  function change(value: number) {
    t.reset();
    setBpm(clampBpm(value));
  }
  function tap() {
    const now = performance.now();
    taps.current = taps.current.filter((x) => now - x < 6000).slice(-4);
    taps.current.push(now);
    if (taps.current.length > 1) {
      const intervals = taps.current.length - 1;
      change((60000 * intervals) / (now - taps.current[0]));
    }
  }
  return (
    <div className="metronome-page page-enter">
      <div className="page-heading">
        <div>
          <span className="eyebrow">FIND YOUR RHYTHM</span>
          <h1>心地よいリズムを、からだに。</h1>
          <p>クリックに合わせて、一音ずつ。ゆっくりで大丈夫。</p>
        </div>
      </div>
      <section className="metronome-panel">
        <span className="metronome-symbol">
          <Timer size={31} strokeWidth={1.5} />
        </span>
        <div className="metronome-label">YOUR TEMPO</div>
        <div className="metro-bpm">
          <button
            className="icon-button"
            onClick={() => change(bpm - 1)}
            aria-label="BPMを1下げる"
          >
            <Minus size={22} />
          </button>
          <label>
            <TempoInput label="BPM" value={bpm} onCommit={change} />
            <span>BEATS PER MINUTE</span>
          </label>
          <button
            className="icon-button"
            onClick={() => change(bpm + 1)}
            aria-label="BPMを1上げる"
          >
            <Plus size={22} />
          </button>
        </div>
        <input
          className="tempo-range"
          aria-label="テンポ"
          type="range"
          min="30"
          max="220"
          value={bpm}
          onChange={(e) => change(Number(e.target.value))}
        />
        <div className="range-labels">
          <span>30 BPM / SLOW</span>
          <span>220 BPM / FAST</span>
        </div>
        <div className="tempo-presets">
          {[60, 80, 100, 120].map((n) => (
            <button
              className={bpm === n ? "selected" : ""}
              key={n}
              onClick={() => change(n)}
            >
              {n} BPM
            </button>
          ))}
        </div>
        <div className="metro-beats">
          {Array.from({ length: meter }, (_, n) => (
            <span className={t.running && beat === n ? "active" : ""} key={n}>
              {n + 1}
            </span>
          ))}
        </div>
        <div className="metro-options">
          <label>
            拍子{" "}
            <select
              value={meter}
              onChange={(e) => {
                t.reset();
                setMeter(Number(e.target.value));
              }}
            >
              <option value={4}>4 / 4</option>
              <option value={3}>3 / 4</option>
            </select>
          </label>
          <button onClick={() => setSound((v) => !v)} aria-pressed={sound}>
            {sound ? <Volume2 size={17} /> : <VolumeX size={17} />}クリック音{" "}
            {sound ? "ON" : "OFF"}
          </button>
        </div>
        <button
          className="button primary metro-start"
          onClick={t.running ? t.pause : t.play}
        >
          {t.running ? (
            <Pause size={21} fill="currentColor" />
          ) : (
            <Play size={21} fill="currentColor" />
          )}
          {t.running ? "ストップ" : "リズムをスタート"}
        </button>
        <button className="tap-tempo" onClick={tap}>
          <Hand size={16} />
          タップでテンポを設定
        </button>
        {t.audioError && (
          <p className="small">
            音声を利用できないため、拍の表示をご利用ください。
          </p>
        )}
        <p className="small muted">
          テンポや拍子を変えたら、もう一度スタート。
          <br />
          画面を離れると自動で停止します。
        </p>
      </section>
      <div className="metro-tip">
        <span>TRY THIS</span>
        <p>
          はじめは60 BPMで。「1、2、3、4」と声に出しながら、
          <br />
          開放弦を1拍ずつ鳴らしてみよう。
        </p>
      </div>
    </div>
  );
}
