"use client";
import Link from "next/link";
import { ArrowRight, Check, Clock3, Info, Repeat2, Star } from "lucide-react";
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
      <section className="demo-score">
        <div className="section-heading">
          <h2>演奏フィードバック</h2>
          <span className="pill peach">DEMO / デモ結果</span>
        </div>
        <div className="notice">
          <Info size={19} />
          <div>
            <strong>以下のスコアは、採点イメージのデモデータです。</strong>
            <p>
              実際の演奏音は取得・判定していません。あなたの演奏の評価ではありません。
            </p>
          </div>
        </div>
        <div className="score-examples">
          <div>
            <span>音程の正確さ</span>
            <strong>
              85<small> / 100</small>
            </strong>
            <div className="progress-track">
              <div style={{ width: "85%" }} />
            </div>
          </div>
          <div>
            <span>リズムの安定感</span>
            <strong>
              78<small> / 100</small>
            </strong>
            <div className="progress-track">
              <div style={{ width: "78%" }} />
            </div>
          </div>
        </div>
        <p className="small muted">
          今後、マイク入力による音程・リズム判定の追加を予定しています。
        </p>
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
