"use client";
import Link from "next/link";
import { ArrowRight, BookOpen, Check, Clock3 } from "lucide-react";
import { lessons } from "@/lib/content";
import { useProgress } from "@/components/progress-provider";
export default function Lessons() {
  const { progress } = useProgress();
  const percent = (progress.completed.length / lessons.length) * 100;
  return (
    <div className="page-enter">
      <div className="page-heading">
        <div>
          <span className="eyebrow">LEARN THE BASICS</span>
          <h1>ベースと、仲よくなろう。</h1>
          <p>知る、試す、弾いてみる。{lessons.length}のレッスン。</p>
        </div>
        <span className="date-pill">{progress.completed.length} / {lessons.length} 完了</span>
      </div>
      <div className="course-banner">
        <BookOpen size={29} />
        <div>
          <h3>はじめてのベースコース</h3>
          <p>
            楽器のことから最初のフレーズまで。好きなレッスンから復習もできます。
          </p>
          <a className="technique-link" href="#technique-comparison">
            3つの奏法を比べる <ArrowRight size={15} />
          </a>
        </div>
        <div className="course-progress">
          <strong>{Math.round(percent)}%</strong>
          <div className="progress-track">
            <div style={{ width: `${percent}%` }} />
          </div>
        </div>
      </div>
      <div className="lesson-list">
        {lessons.map((l, i) => (
          <Link
            className={`lesson-row ${progress.completed.includes(l.id) ? "is-complete" : ""}`}
            href={`/lessons/${l.id}/`}
            key={l.id}
          >
            <div className={`lesson-number ${l.theme}`}>
              {progress.completed.includes(l.id) ? (
                <Check size={24} />
              ) : (
                String(i + 1).padStart(2, "0")
              )}
            </div>
            <div className="lesson-row-text">
              <span className="eyebrow">
                LESSON {String(i + 1).padStart(2, "0")}
                {l.technique && ` · ${l.technique.level}`}
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
      <section
        className="technique-comparison"
        id="technique-comparison"
        aria-labelledby="technique-comparison-title"
      >
        <h2 id="technique-comparison-title">3つの奏法の違い</h2>
        <table aria-labelledby="technique-comparison-title">
          <thead>
            <tr>
              <th scope="col">奏法</th>
              <th scope="col">弾き方と音の特徴</th>
            </tr>
          </thead>
          <tbody>
            {lessons.map((lesson) => (
              lesson.technique && (
                <tr key={lesson.id}>
                  <th scope="row">
                    <Link href={`/lessons/${lesson.id}/`}>{lesson.title}</Link>
                    <span className={`pill ${lesson.theme}`}>
                      {lesson.technique.level}
                    </span>
                  </th>
                  <td>{lesson.technique.comparison}</td>
                </tr>
              )
            ))}
          </tbody>
        </table>
      </section>
      <div className="notice">
        <BookOpen size={18} />{" "}
        楽器がなくても学べます。演奏練習に進むときに、ベースを用意してください。
      </div>
    </div>
  );
}
