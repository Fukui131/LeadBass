"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Clock3,
  Guitar,
  Info,
  Pause,
  Play,
  Repeat2,
  RotateCcw,
  Volume2,
  VolumeX,
} from "lucide-react";
import { phrases, type Phrase } from "@/lib/content";
import { clampBpm, phraseBeats, timeline } from "@/lib/music";
import { Fretboard, TabScore } from "@/components/fretboard";
import { useProgress } from "@/components/progress-provider";
import { useTransport } from "@/components/use-transport";
import { TempoInput } from "@/components/tempo-input";
export default function Practice() {
  const [selected, setSelected] = useState<Phrase | null>(null);
  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("phrase");
    if (id) setSelected(phrases.find((p) => p.id === id) ?? null);
  }, []);
  return (
    <div className="page-enter">
      {selected ? (
        <Player phrase={selected} onBack={() => setSelected(null)} />
      ) : (
        <>
          <div className="page-heading">
            <div>
              <span className="eyebrow">MAKE YOUR FIRST GROOVE</span>
              <h1>ベースを持って、弾いてみよう。</h1>
              <p>光るTAB譜と指板をガイドに。あせらず、あなたのテンポで。</p>
            </div>
            <span className="date-pill">
              <Guitar size={16} />
              実物のベースで練習
            </span>
          </div>
          <div className="practice-intro">
            <div className="intro-icon">
              <Guitar size={37} strokeWidth={1.4} />
            </div>
            <div>
              <h3>見る → 押さえる → 音にする。</h3>
              <p>
                TAB譜と指板のハイライトが、次の一音を教えてくれます。
                <br />
                4拍のカウントに続いて、演奏をはじめましょう。
              </p>
            </div>
            <span className="practice-intro-note">YOUR FIRST SESSION</span>
          </div>
          <div className="section-heading">
            <h2>今日は、どのフレーズにする？</h2>
            <span className="small muted">4つのオリジナルフレーズ</span>
          </div>
          <div className="phrase-grid">
            {phrases.map((p, i) => (
              <button
                className="phrase-card"
                key={p.id}
                onClick={() => {
                  setSelected(p);
                  window.scrollTo({ top: 0, behavior: "instant" });
                }}
              >
                <div className={`phrase-preview ${p.color}`}>
                  <span className="eyebrow">
                    PHRASE {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="mini-tab">
                    {p.notes.slice(0, 8).map((n, j) => (
                      <span key={j}>{n.fret}</span>
                    ))}
                  </div>
                  <span className="phrase-play">
                    <Play size={19} fill="currentColor" />
                  </span>
                </div>
                <div className="phrase-info">
                  <span className={`pill ${p.color}`}>{p.level}</span>
                  <h2>{p.title}</h2>
                  <p>{p.subtitle}</p>
                  <div>
                    <span>
                      <Clock3 size={14} />
                      {p.bpm} BPM
                    </span>
                    <span>{phraseBeats(p.notes) / 4}小節・4/4拍子</span>
                    <ArrowRight size={18} />
                  </div>
                </div>
              </button>
            ))}
          </div>
          <div className="notice">
            <Info size={18} />
            ガイドに合わせて実物のベースを弾く練習です。音声の取得や演奏の自動判定は行いません。
          </div>
        </>
      )}
    </div>
  );
}
function Player({ phrase, onBack }: { phrase: Phrase; onBack: () => void }) {
  const [bpm, setBpm] = useState(phrase.bpm),
    [sound, setSound] = useState(true),
    [loop, setLoop] = useState(false);
  const transport = useTransport(bpm, sound);
  const { savePractice } = useProgress();
  const router = useRouter();
  const saved = useRef(false);
  const frame = timeline(phrase.notes, transport.elapsed, bpm, loop);
  const note = phrase.notes[frame.index];
  const completedCycles = loop ? frame.cycle : frame.finished ? 1 : 0;
  function finish() {
    if (saved.current) return;
    saved.current = true;
    transport.pause();
    savePractice({
      phraseId: phrase.id,
      title: phrase.title,
      bpm,
      seconds: Math.max(
        0,
        Math.round((transport.elapsed - (4 * 60000) / bpm) / 1000),
      ),
      cycles: Math.max(1, completedCycles),
      date: new Date().toISOString(),
    });
    router.push("/results/");
  }
  useEffect(() => {
    if (frame.finished) finish();
  }, [frame.finished]);
  function changeBpm(value: number) {
    transport.reset();
    setBpm(clampBpm(value));
  }
  return (
    <>
      <button className="back-link" onClick={onBack}>
        <ArrowLeft size={15} /> フレーズ一覧へ
      </button>
      <div className="page-heading">
        <div>
          <span className="eyebrow">PRACTICE STUDIO</span>
          <h1>{phrase.title}</h1>
          <p>{phrase.subtitle}</p>
        </div>
        <span className={`pill ${phrase.color}`}>{phrase.level}</span>
      </div>
      <div className="player-layout">
        <section className="player-main">
          <div className="score-panel">
            <div className="section-heading">
              <h2>TAB譜</h2>
              <span className="small muted">
                {phraseBeats(phrase.notes) / 4}小節 / 4拍子
              </span>
            </div>
            <div className="player-status" aria-live="polite">
              {transport.elapsed === 0 ? (
                "準備ができたら、練習スタート。"
              ) : frame.countdown ? (
                <>
                  カウントイン <strong>{frame.countdown}</strong>
                </>
              ) : transport.running ? (
                "ハイライトに合わせて、弾いてみよう。"
              ) : (
                "一時停止中。指の位置を確認しよう。"
              )}
            </div>
            <TabScore
              notes={phrase.notes}
              active={
                frame.countdown && transport.elapsed > 0 ? -1 : frame.index
              }
            />
            <div className="score-progress">
              <div style={{ width: `${frame.progress * 100}%` }} />
            </div>
            <div className="score-footer">
              <span>
                <span className="active-dot" />
                いま弾く音
              </span>
              <span>
                {loop ? `${frame.cycle + 1}回目` : "1フレーズ"} ·{" "}
                {frame.countdown
                  ? transport.elapsed === 0
                    ? "準備中"
                    : "カウント中"
                  : `${frame.index + 1} / ${phrase.notes.length} 音`}
              </span>
            </div>
          </div>
          <div className="board-panel">
            <div className="section-heading">
              <h2>指板ガイド</h2>
              <span className="small muted">左がヘッド側</span>
            </div>
            <Fretboard
              string={note.string}
              fret={note.fret}
              showActive={transport.elapsed === 0 || !frame.countdown}
            />
            <p className="small muted board-help">
              数字の位置のフレットを押さえよう。「0」は開放弦です。
            </p>
          </div>
          <div className="player-controls">
            <button
              className="icon-button"
              aria-label="最初に戻す"
              onClick={() => {
                transport.reset();
                saved.current = false;
              }}
            >
              <RotateCcw size={20} />
            </button>
            <button
              className="button primary play-button"
              onClick={transport.running ? transport.pause : transport.play}
            >
              {transport.running ? (
                <Pause size={20} fill="currentColor" />
              ) : (
                <Play size={20} fill="currentColor" />
              )}
              {transport.running
                ? "一時停止"
                : transport.elapsed > 0
                  ? "練習を再開"
                  : "練習スタート"}
            </button>
            <button
              className={`icon-button ${loop ? "on" : ""}`}
              aria-label="繰り返し"
              aria-pressed={loop}
              onClick={() => setLoop((v) => !v)}
            >
              <Repeat2 size={21} />
            </button>
          </div>
          {loop && completedCycles > 0 && (
            <button className="finish-loop button secondary" onClick={finish}>
              <Check size={17} />
              練習を終えて結果を見る（{completedCycles}回完奏）
            </button>
          )}
          <p className="center small muted">
            {loop
              ? "繰り返し ON · 1回弾き終わると終了ボタンが表示されます。"
              : "最後まで弾くと、自動で結果画面に進みます。"}
          </p>
        </section>
        <aside className="practice-settings">
          <span className="eyebrow">YOUR PACE</span>
          <h2>テンポを決めよう</h2>
          <div className="bpm-adjust">
            <button
              aria-label="BPMを5下げる"
              disabled={transport.running}
              onClick={() => changeBpm(bpm - 5)}
            >
              −
            </button>
            <label>
              <TempoInput
                label="練習BPM"
                value={bpm}
                disabled={transport.running}
                onCommit={changeBpm}
              />
              <span>BPM</span>
            </label>
            <button
              aria-label="BPMを5上げる"
              disabled={transport.running}
              onClick={() => changeBpm(bpm + 5)}
            >
              ＋
            </button>
          </div>
          <input
            className="tempo-range"
            aria-label="練習テンポ"
            type="range"
            min="30"
            max="220"
            value={bpm}
            disabled={transport.running}
            onChange={(e) => changeBpm(Number(e.target.value))}
          />
          <div className="range-labels">
            <span>30</span>
            <span>220</span>
          </div>
          <div className="beat-dots">
            {[0, 1, 2, 3].map((n) => (
              <span
                key={n}
                className={
                  transport.running && frame.beat === n ? "active" : ""
                }
              >
                {n + 1}
              </span>
            ))}
          </div>
          <button
            className="sound-toggle"
            onClick={() => setSound((v) => !v)}
            aria-pressed={sound}
          >
            {sound ? <Volume2 size={19} /> : <VolumeX size={19} />}クリック音
            <span className={`toggle ${sound ? "enabled" : ""}`} />
          </button>
          <div className="settings-tip">
            <strong>まずは、ゆっくり。</strong>
            <p>
              弾きにくいときはBPMを下げてみよう。テンポを変えると、最初から練習できます。
            </p>
          </div>
          {transport.audioError && (
            <p className="small">
              クリック音を利用できません。拍の表示に合わせて練習できます。
            </p>
          )}
          <p className="small muted">画面を離れると自動で一時停止します。</p>
        </aside>
      </div>
    </>
  );
}
