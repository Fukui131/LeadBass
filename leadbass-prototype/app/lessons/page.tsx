"use client";
import Link from "next/link";
import { ArrowRight, BookOpen, Check, Clock3 } from "lucide-react";
import { lessons } from "@/lib/content";
import { useProgress } from "@/components/progress-provider";
export default function Lessons() {
  const { progress } = useProgress();
  return (
    <div className="page-enter">
      <div className="page-heading">
        <div>
          <span className="eyebrow">LEARN THE BASICS</span>
          <h1>ベースと、仲よくなろう。</h1>
          <p>知る、試す、弾いてみる。7つの小さなステップ。</p>
        </div>
        <span className="date-pill">{progress.completed.length} / 7 完了</span>
      </div>
      <div className="course-banner">
        <BookOpen size={29} />
        <div>
          <h3>はじめてのベースコース</h3>
          <p>
            楽器のことから最初のフレーズまで。好きなレッスンから復習もできます。
          </p>
        </div>
        <div className="course-progress">
          <strong>{Math.round((progress.completed.length / 7) * 100)}%</strong>
          <div className="progress-track">
            <div
              style={{ width: `${(progress.completed.length / 7) * 100}%` }}
            />
          </div>
        </div>
      </div>
      <div className="lesson-list">
        {lessons.map((l) => (
          <Link
            className={`lesson-row ${progress.completed.includes(l.id) ? "is-complete" : ""}`}
            href={`/lessons/${l.id}/`}
            key={l.id}
          >
            <div className={`lesson-number ${l.theme}`}>
              {progress.completed.includes(l.id) ? (
                <Check size={24} />
              ) : (
                String(l.id).padStart(2, "0")
              )}
            </div>
            <div className="lesson-row-text">
              <span className="eyebrow">
                LESSON {String(l.id).padStart(2, "0")}
              </span>
              <h2>{l.title}</h2>
              <p>{l.subtitle}</p>
            </div>
            <span className="lesson-duration">
              <Clock3 size={14} />
              {l.minutes}分
            </span>
            <span
              className={`pill ${progress.completed.includes(l.id) ? "sage" : "neutral"}`}
            >
              {progress.completed.includes(l.id)
                ? "完了"
                : progress.steps[l.id]
                  ? "学習中"
                  : "未学習"}
            </span>
            <ArrowRight size={20} />
          </Link>
        ))}
      </div>
      <div className="notice">
        <BookOpen size={18} />{" "}
        楽器がなくても学べます。演奏練習に進むときに、ベースを用意してください。
      </div>
    </div>
  );
}
