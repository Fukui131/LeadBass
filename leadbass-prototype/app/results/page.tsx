"use client";
import Link from "next/link";
import { ArrowRight, Check, Repeat2, Star } from "lucide-react";
import { useProgress } from "@/components/progress-provider";
export default function Results() {
  const { progress, ready } = useProgress();
  const r = progress.lastResult;
  if (!ready)
    return <div className="completion-panel">練習記録を読み込み中…</div>;
  if (!r)
    return (
      <div className="completion-panel">
        <span className="eyebrow">YOUR FIRST SESSION</span>
        <h1>最初の練習を、はじめよう。</h1>
        <p>演奏練習を完了すると、ここに結果が表示されます。</p>
        <Link className="button primary" href="/practice/">
          フレーズを選ぶ
          <ArrowRight size={16} />
        </Link>
      </div>
    );
  return (
    <div className="result-page page-enter">
      <div className="result-celebration">
        <span className="completion-icon">
          <Check size={37} />
        </span>
        <span className="eyebrow">NICE SESSION!</span>
        <h1>今日も、一歩前へ。</h1>
        <p>最後まで取り組んだ自分に、小さな拍手を。</p>
      </div>
      <section className="result-summary">
        <span className="pill sage">
          <Check size={13} />
          練習完了
        </span>
        <h2>{r.title}</h2>
        {(r.noteBeats === 1 || r.noteBeats === 0.5) && (
          <p className="small result-note-length">
            {r.noteBeats === 1 ? "4分音符" : "8分音符"}
          </p>
        )}
        <div className="result-stats">
          <div>
            <span>テンポ</span>
            <strong>
              {r.bpm}
              <small>BPM</small>
            </strong>
          </div>
          <div>
            <span>練習時間</span>
            <strong>
              {Math.floor(r.seconds / 60)}
              <small>分</small>
              {r.seconds % 60}
              <small>秒</small>
            </strong>
          </div>
          <div>
            <span>完奏回数</span>
            <strong>
              {r.cycles}
              <small>回</small>
            </strong>
          </div>
        </div>
      </section>
      <div className="result-encouragement">
        <Star size={21} />
        <p>
          次は少しテンポを落として、一音ずつ丁寧に。
          <br />
          <strong>「昨日より少しできた」を、積み重ねよう。</strong>
        </p>
      </div>
      <div className="button-row">
        <Link
          className="button primary"
          href={`/practice/?phrase=${r.phraseId}`}
        >
          <Repeat2 size={17} />
          もう一度練習する
        </Link>
        <Link className="button secondary" href="/">
          ホームで進捗を見る
          <ArrowRight size={17} />
        </Link>
      </div>
    </div>
  );
}
