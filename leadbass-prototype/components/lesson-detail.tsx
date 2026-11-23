"use client";
import Link from "next/link";
import { useRef, useState } from "react";
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
import { TechniqueDiagram } from "./technique-diagram";
export function LessonDetail({ id }: { id: number }) {
  const index = lessons.findIndex((l) => l.id === id);
  const lesson = lessons[index];
  const nextLesson = lessons[index + 1];
  const { progress, ready, saveStep, completeLesson } = useProgress();
  const [finished, setFinished] = useState(false);
  const readingTop = useRef<HTMLDivElement>(null);
  const lastStep = lesson.steps.length - 1;
  const step = Math.min(
    lastStep,
    Math.max(0, Math.trunc(Number(progress.steps[id])) || 0),
  );
  const current = lesson.steps[step];
  function moveToStep(nextStep: number) {
    saveStep(id, nextStep);
    readingTop.current?.focus();
  }
  function advance() {
    if (step === lastStep) {
      completeLesson(id, lesson.title);
      setFinished(true);
    } else {
      moveToStep(step + 1);
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
            LESSON {String(index + 1).padStart(2, "0")} /{" "}
            {String(lessons.length).padStart(2, "0")}
            {lesson.technique && ` · ${lesson.technique.level}`}
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
              href={nextLesson ? `/lessons/${nextLesson.id}/` : "/practice/"}
            >
              {nextLesson ? "次のレッスンへ" : "演奏練習へ"}
              <ArrowRight size={16} />
            </Link>
            <Link className="button secondary" href="/">
              ホームで進捗を見る
            </Link>
          </div>
        </section>
      ) : (
        <div className="lesson-reading">
          <div className="reading-top" ref={readingTop} tabIndex={-1}>
            <span aria-live="polite">
              <BookOpen size={17} /> STEP {step + 1} / {lesson.steps.length}
            </span>
            <div className="step-bars" aria-hidden="true">
              {lesson.steps.map((section, i) => (
                <i key={section.title} className={i <= step ? "filled" : ""} />
              ))}
            </div>
          </div>
          {current.visual && (
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
              ) : current.visual === "hand" ? (
                <div className="hand-visual">
                  <Hand size={86} strokeWidth={1} />
                  <div>
                    <strong>リラックスして、やさしく。</strong>
                    <span>肩の力を抜く → 手首を自然に → 指先で触れる</span>
                  </div>
                </div>
              ) : (
                <TechniqueDiagram visual={current.visual} />
              )}
            </div>
          )}
          <article>
            <h2>{current.title}</h2>
            <p>{current.text}</p>
            {current.points && (
              <ol className="lesson-points">
                {current.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ol>
            )}
            <div className="lesson-tip">
              <Lightbulb size={21} />
              <div>
                <strong>やってみよう</strong>
                <p>{current.tip}</p>
              </div>
            </div>
            {lesson.technique && step === 0 && (
              <Link
                className="technique-link"
                href="/lessons/#technique-comparison"
              >
                3つの奏法を比べる <ArrowRight size={15} />
              </Link>
            )}
          </article>
          <div className="reading-controls">
            <button
              className="button secondary"
              disabled={!ready || step === 0}
              onClick={() => moveToStep(step - 1)}
            >
              <ArrowLeft size={16} />
              前へ
            </button>
            <span className="small muted">
              {step + 1} / {lesson.steps.length} ステップ
            </span>
            <button className="button primary" disabled={!ready} onClick={advance}>
              {step === lastStep ? "レッスンを完了" : "次のステップ"}
              {step === lastStep ? <Check size={17} /> : <ArrowRight size={17} />}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
