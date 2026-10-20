"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Lightbulb,
  Hand,
  BookOpen,
} from "lucide-react";
import { lessons } from "@/lib/content";
import { useProgress } from "./progress-provider";
import { BassArt } from "./bass-art";
import { Fretboard, TabScore } from "./fretboard";
export function LessonDetail({ id }: { id: number }) {
  const lesson = lessons.find((l) => l.id === id)!;
  const { progress, ready, saveStep, completeLesson } = useProgress();
  const [step, setStep] = useState(0),
    [finished, setFinished] = useState(false);
  useEffect(() => {
    if (ready)
      setStep(Math.min(1, Math.max(0, Number(progress.steps[id]) || 0)));
  }, [ready, id]);
  const current = lesson.steps[step];
  function advance() {
    if (step === 1) {
      completeLesson(id, lesson.title);
      setFinished(true);
    } else {
      setStep(1);
      saveStep(id, 1);
    }
  }
  return (
    <div className="lesson-detail page-enter">
      <Link className="back-link" href="/lessons/">
        <ArrowLeft size={15} /> レッスン一覧へ
      </Link>
      <div className="page-heading">
        <div>
          <span className="eyebrow">
            LESSON {String(id).padStart(2, "0")} / 07
          </span>
          <h1>{lesson.title}</h1>
          <p>{lesson.subtitle}</p>
        </div>
        <span className="pill peach">約{lesson.minutes}分</span>
      </div>
      {finished ? (
        <section className="completion-panel">
          <span className="completion-icon">
            <Check size={35} />
          </span>
          <span className="eyebrow">ONE STEP FORWARD</span>
          <h2>またひとつ、できることが増えた。</h2>
          <p>「{lesson.title}」を完了しました。</p>
          <div className="button-row">
            <Link
              className="button primary"
              href={id < 7 ? `/lessons/${id + 1}/` : "/practice/"}
            >
              {id < 7 ? "次のレッスンへ" : "演奏練習へ"}
              <ArrowRight size={16} />
            </Link>
            <Link className="button secondary" href="/">
              ホームで進捗を見る
            </Link>
          </div>
        </section>
      ) : (
        <div className="lesson-reading">
          <div className="reading-top">
            <span>
              <BookOpen size={17} /> STEP {step + 1} / 2
            </span>
            <div className="step-bars">
              <i className="filled" />
              <i className={step === 1 ? "filled" : ""} />
            </div>
          </div>
          <div className={`lesson-visual ${lesson.theme}`}>
            {current.visual === "bass" ? (
              <>
                <BassArt />
                <div className="part-labels">
                  <span>01 ヘッド</span>
                  <span>02 ネック・指板</span>
                  <span>03 ボディ</span>
                </div>
              </>
            ) : current.visual === "tab" ? (
              <TabScore
                compact
                notes={[
                  { string: 4, fret: 0, beats: 1 },
                  { string: 4, fret: 2, beats: 1 },
                  { string: 4, fret: 3, beats: 1 },
                  { string: 3, fret: 0, beats: 1 },
                ]}
                active={2}
              />
            ) : current.visual === "strings" ? (
              <Fretboard string={4} fret={3} />
            ) : current.visual === "rhythm" ? (
              <div className="rhythm-visual">
                {[1, 2, 3, 4].map((n) => (
                  <div key={n}>
                    <span>♩</span>
                    <strong>{n}</strong>
                  </div>
                ))}
                <p>1 · 2 · 3 · 4　/　ゆっくり、一定のリズムで</p>
              </div>
            ) : (
              <div className="hand-visual">
                <Hand size={86} strokeWidth={1} />
                <div>
                  <strong>リラックスして、やさしく。</strong>
                  <span>肩の力を抜く → 手首を自然に → 指先で触れる</span>
                </div>
              </div>
            )}
          </div>
          <article>
            <h2>{current.title}</h2>
            <p>{current.text}</p>
            <div className="lesson-tip">
              <Lightbulb size={21} />
              <div>
                <strong>やってみよう</strong>
                <p>{current.tip}</p>
              </div>
            </div>
          </article>
          <div className="reading-controls">
            <button
              className="button secondary"
              disabled={step === 0}
              onClick={() => {
                setStep(0);
                saveStep(id, 0);
              }}
            >
              <ArrowLeft size={16} />
              前へ
            </button>
            <span className="small muted">{step + 1} / 2 ステップ</span>
            <button className="button primary" onClick={advance}>
              {step === 1 ? "レッスンを完了" : "次のステップ"}
              {step === 1 ? <Check size={17} /> : <ArrowRight size={17} />}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
