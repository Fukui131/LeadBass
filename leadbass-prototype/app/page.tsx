"use client";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Check,
  Clock3,
  Flame,
  Guitar,
  Lightbulb,
  MoveUpRight,
  Play,
  SquareCheckBig,
  Timer,
  TrendingUp,
} from "lucide-react";
import { BassArt } from "@/components/bass-art";
import { useProgress } from "@/components/progress-provider";
import { lessons } from "@/lib/content";
export default function Home() {
  const { progress, ready } = useProgress();
  const next =
    lessons.find((l) => !progress.completed.includes(l.id)) ?? lessons[6];
  const percent = Math.round((progress.completed.length / 7) * 100);
  const practice = progress.history.filter((h) => h.type === "practice");
  const seconds = practice.reduce((sum, h) => sum + (h.seconds ?? 0), 0);
  const days = new Set(
    progress.history.map((h) => new Date(h.date).toLocaleDateString()),
  );
  const today = new Date();
  const week = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - ((d.getDay() + 6) % 7) + i);
    return d;
  });
  return (
    <div className="home-page page-enter">
      <div className="page-heading">
        <div>
          <div className="eyebrow">YOUR BASS JOURNEY</div>
          <h1>
            さあ、今日も音を楽しもう<span className="title-dot">。</span>
          </h1>
          <p>1日5分から。あなたのペースで、一歩ずつ。</p>
        </div>
        <span className="date-pill">
          <span className="tiny-dot" />
          初心者コース
        </span>
      </div>
      <section className="hero">
        <div className="hero-content">
          <span className="hero-tag">
            <span /> HELLO, NEW BASSIST
          </span>
          <h2>
            はじめの一音から、
            <br />
            自分だけのグルーヴへ。
          </h2>
          <p>
            弦に触れる。音を出す。少しずつ、できることが増えていく。
            <br className="desktop-break" />
            ベースとの毎日を、ここからはじめよう。
          </p>
          <Link className="button dark" href={`/lessons/${next.id}/`}>
            {progress.completed.length
              ? "続きからレッスン"
              : "最初のレッスンをはじめる"}
            <ArrowRight size={17} />
          </Link>
          <span className="hero-foot">
            <Clock3 size={13} /> まずは3分。楽器がなくても大丈夫。
          </span>
        </div>
        <BassArt className="hero-art" />
        <span className="hero-number">01 / YOUR FIRST NOTE</span>
      </section>
      <div className="stat-grid">
        <div className="stat-card">
          <div className="stat-icon peach">
            <BookOpen size={20} />
          </div>
          <div>
            <span>レッスンの達成</span>
            <strong>
              {progress.completed.length}
              <small> / 7 レッスン</small>
            </strong>
          </div>
          <div
            className="mini-progress"
            style={{ "--progress": `${percent}%` } as React.CSSProperties}
          >
            <span>{percent}%</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon sage">
            <Clock3 size={20} />
          </div>
          <div>
            <span>これまでの練習時間</span>
            <strong>
              {Math.floor(seconds / 60)}
              <small> 分 {Math.round(seconds % 60)}秒</small>
            </strong>
          </div>
          <span className="stat-caption">積み重ねが力に</span>
        </div>
        <div className="stat-card">
          <div className="stat-icon lavender">
            <Flame size={20} />
          </div>
          <div>
            <span>学習した日数</span>
            <strong>
              {days.size}
              <small> 日</small>
            </strong>
          </div>
          <span className="stat-caption">小さな一歩を大切に</span>
        </div>
      </div>
      <div className="dashboard-columns">
        <div>
          <div className="section-heading">
            <h2>今日のレッスン</h2>
            <Link href="/lessons/">
              すべて見る <ArrowRight size={15} />
            </Link>
          </div>
          <Link className="next-lesson" href={`/lessons/${next.id}/`}>
            <div className="lesson-art">
              <BookOpen size={43} strokeWidth={1.2} />
              <span>LESSON {String(next.id).padStart(2, "0")}</span>
              <div className="lesson-art-lines">
                <i />
                <i />
                <i />
              </div>
            </div>
            <div className="next-lesson-content">
              <span className="pill peach">
                {progress.completed.includes(next.id)
                  ? "復習しよう"
                  : "ここからはじめよう"}
              </span>
              <h3>{next.title}</h3>
              <p>{next.subtitle}</p>
              <div className="lesson-meta">
                <span>
                  <Clock3 size={14} />
                  {next.minutes}分
                </span>
                <span>2ステップ</span>
                <span className="round-arrow">
                  <ArrowRight size={17} />
                </span>
              </div>
            </div>
          </Link>
          <div className="section-heading explore-heading">
            <h2>気になることから、やってみよう</h2>
          </div>
          <div className="explore-grid">
            <Link href="/quiz/" className="explore-card">
              <div className="explore-top">
                <span className="feature-icon lavender">
                  <SquareCheckBig size={23} />
                </span>
                <MoveUpRight size={17} />
              </div>
              <h3>TAB譜クイズ</h3>
              <p>
                この数字、どこを押さえる？
                <br />
                クイズで楽しく覚えよう。
              </p>
              <span className="card-link">
                5問にチャレンジ <ArrowRight size={14} />
              </span>
            </Link>
            <Link href="/practice/" className="explore-card">
              <div className="explore-top">
                <span className="feature-icon sage">
                  <Guitar size={24} />
                </span>
                <MoveUpRight size={17} />
              </div>
              <h3>演奏練習</h3>
              <p>
                光る指板を道しるべに、
                <br />
                最初のフレーズを弾こう。
              </p>
              <span className="card-link">
                フレーズを選ぶ <ArrowRight size={14} />
              </span>
            </Link>
            <Link href="/metronome/" className="explore-card">
              <div className="explore-top">
                <span className="feature-icon peach">
                  <Timer size={24} />
                </span>
                <MoveUpRight size={17} />
              </div>
              <h3>メトロノーム</h3>
              <p>
                ゆっくり、一定のリズムで。
                <br />
                音の流れを感じよう。
              </p>
              <span className="card-link">
                リズムを刻む <ArrowRight size={14} />
              </span>
            </Link>
          </div>
        </div>
        <aside className="dashboard-right">
          <section className="progress-card">
            <div className="section-heading">
              <h2>あなたの学習マップ</h2>
              <span className="small muted">{percent}%</span>
            </div>
            <div className="progress-track">
              <div style={{ width: `${percent}%` }} />
            </div>
            <p className="small muted">7つのステップで、はじめての演奏へ。</p>
            <div className="learning-map">
              {[
                {
                  n: 1,
                  title: "ベースと仲よくなろう",
                  sub: "楽器の基本・構え方",
                  done: [1, 2],
                },
                {
                  n: 3,
                  title: "音と指板を知ろう",
                  sub: "弦・音の出し方・TAB譜",
                  done: [3, 4, 5],
                },
                {
                  n: 6,
                  title: "リズムにのって弾こう",
                  sub: "リズム・フレーズ練習",
                  done: [6, 7],
                },
              ].map((item, i) => {
                const done = item.done.every((n) =>
                  progress.completed.includes(n),
                );
                return (
                  <Link
                    key={item.n}
                    href={`/lessons/${item.n}/`}
                    className={`map-step ${done ? "done" : i === 0 ? "current" : ""}`}
                  >
                    <span className="map-node">
                      {done ? (
                        <Check size={14} />
                      ) : (
                        String(i + 1).padStart(2, "0")
                      )}
                    </span>
                    <div>
                      <strong>{item.title}</strong>
                      <span>{item.sub}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
            <div className="week-activity">
              <div>
                <strong>今週のリズム</strong>
                <span>
                  <Flame size={13} />{" "}
                  {ready
                    ? week.filter((d) => days.has(d.toLocaleDateString()))
                        .length
                    : 0}{" "}
                  / 7 日
                </span>
              </div>
              <div className="week-days">
                {week.map((d, i) => (
                  <div key={i}>
                    <span>{["月", "火", "水", "木", "金", "土", "日"][i]}</span>
                    <i
                      className={`${ready && days.has(d.toLocaleDateString()) ? "completed" : ""} ${ready && d.toDateString() === today.toDateString() ? "today" : ""}`}
                    >
                      {ready && days.has(d.toLocaleDateString()) ? (
                        <Check size={14} />
                      ) : (
                        <span />
                      )}
                    </i>
                  </div>
                ))}
              </div>
            </div>
          </section>
          <section className="tip-card">
            <span className="tip-title">
              <Lightbulb size={17} /> ONE LITTLE TIP
            </span>
            <h3>速さよりも、心地よさ。</h3>
            <p>
              最初はゆっくりで大丈夫。
              <br />
              ひとつの音を丁寧に鳴らすことが、
              <br />
              気持ちのいい演奏につながります。
            </p>
            <span className="tip-scribble">one note at a time.</span>
          </section>
        </aside>
      </div>
      <section className="history-section">
        <div className="section-heading">
          <h2>学習のあしあと</h2>
          <span className="small muted">
            <TrendingUp size={14} /> あなたの成長を記録します
          </span>
        </div>
        {progress.history.length ? (
          <div className="history-list">
            {progress.history.slice(0, 5).map((h) => (
              <div className="history-item" key={h.id}>
                <span
                  className={`feature-icon ${h.type === "lesson" ? "peach" : h.type === "quiz" ? "lavender" : "sage"}`}
                >
                  {h.type === "lesson" ? (
                    <BookOpen size={18} />
                  ) : h.type === "quiz" ? (
                    <SquareCheckBig size={18} />
                  ) : (
                    <Guitar size={18} />
                  )}
                </span>
                <div>
                  <strong>{h.title}</strong>
                  <span>{h.detail}</span>
                </div>
                <time>
                  {new Date(h.date).toLocaleDateString("ja-JP", {
                    month: "short",
                    day: "numeric",
                  })}
                </time>
                <Check size={16} />
              </div>
            ))}
          </div>
        ) : (
          <div className="history-empty">
            <span className="empty-notes">♪</span>
            <div>
              <strong>あなたの音楽の旅は、ここから。</strong>
              <p>レッスンや練習を終えると、ここに記録が増えていきます。</p>
            </div>
            <Link href="/lessons/">
              最初の一歩へ <ArrowRight size={15} />
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
