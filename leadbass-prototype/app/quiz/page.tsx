"use client";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  Check,
  RotateCcw,
  SquareCheckBig,
  X,
  Lightbulb,
} from "lucide-react";
import { questions } from "@/lib/content";
import { Fretboard, TabScore } from "@/components/fretboard";
import { useProgress } from "@/components/progress-provider";
export default function Quiz() {
  const { saveQuiz, progress } = useProgress();
  const [ids, setIds] = useState(questions.map((q) => q.id)),
    [index, setIndex] = useState(0),
    [answer, setAnswer] = useState<boolean | null>(null),
    [selected, setSelected] = useState<string | null>(null),
    [score, setScore] = useState(0),
    [wrong, setWrong] = useState<number[]>([]),
    [finished, setFinished] = useState(false),
    [review, setReview] = useState(false);
  const q = questions[ids[index]];
  function respond(correct: boolean, key: string) {
    if (answer !== null) return;
    setAnswer(correct);
    setSelected(key);
    if (correct) setScore((s) => s + 1);
    else setWrong((w) => [...w, q.id]);
  }
  function next() {
    if (index === ids.length - 1) {
      saveQuiz(score, ids.length, review);
      setFinished(true);
    } else {
      setIndex((i) => i + 1);
      setAnswer(null);
      setSelected(null);
    }
  }
  function restart(mistakes = false) {
    setIds(mistakes ? wrong : questions.map((q) => q.id));
    setReview(mistakes);
    setIndex(0);
    setAnswer(null);
    setSelected(null);
    setScore(0);
    setWrong([]);
    setFinished(false);
  }
  return (
    <div className="quiz-page page-enter">
      <div className="page-heading">
        <div>
          <span className="eyebrow">READ IT. FIND IT. PLAY IT.</span>
          <h1>TAB譜を、読める自信に。</h1>
          <p>線と数字の意味を、ひとつずつ確かめよう。</p>
        </div>
        <span className="date-pill">
          最高正答率{" "}
          {progress.quizBest === null ? "—" : `${progress.quizBest}%`}
        </span>
      </div>
      {finished ? (
        <section className="completion-panel">
          <span className="completion-icon">
            <SquareCheckBig size={34} />
          </span>
          <span className="eyebrow">
            {review ? "REVIEW COMPLETE" : "QUIZ COMPLETE"}
          </span>
          <h2>
            {score === ids.length
              ? "全問正解！ 指板が見えてきた。"
              : "チャレンジ完了。一歩ずつ、確実に。"}
          </h2>
          <div className="quiz-score">
            {Math.round((score / ids.length) * 100)}
            <span>%</span>
          </div>
          <p>
            {ids.length}問中 {score}問正解。
            {wrong.length
              ? "間違えた問題をもう一度確認してみよう。"
              : "次はベースを持って、練習してみよう。"}
          </p>
          <div className="button-row">
            {wrong.length > 0 && (
              <button className="button primary" onClick={() => restart(true)}>
                <RotateCcw size={17} />
                間違えた{wrong.length}問を復習
              </button>
            )}
            <button className="button secondary" onClick={() => restart()}>
              <RotateCcw size={16} />
              もう一度5問
            </button>
            <Link className="button dark" href="/practice/">
              演奏練習へ
              <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      ) : (
        <section className="quiz-panel">
          <div className="quiz-top">
            <span className="eyebrow">
              {review ? "REVIEW" : "QUESTION"}{" "}
              {String(index + 1).padStart(2, "0")} /{" "}
              {String(ids.length).padStart(2, "0")}
            </span>
            <span className="pill lavender">
              {q.kind === "choice" ? "4択問題" : "指板を選ぼう"}
            </span>
          </div>
          <div className="progress-track">
            <div style={{ width: `${(index / ids.length) * 100}%` }} />
          </div>
          <h2>この音は、どこを{q.fret === 0 ? "弾く" : "押さえる"}？</h2>
          <p className="muted">
            {q.kind === "choice"
              ? "正しい弦とフレットの組み合わせを選んでください。"
              : "下の指板で、正しい位置をタップしてください。"}
          </p>
          <div className="quiz-tab">
            <TabScore
              compact
              notes={[{ string: q.string, fret: q.fret, beats: 1 }]}
              active={0}
            />
          </div>
          {q.kind === "choice" ? (
            <div className="answer-grid">
              {q.options.map((option, i) => (
                <button
                  disabled={answer !== null}
                  key={option}
                  onClick={() => respond(i === q.correct, String(i))}
                  className={`answer-button ${answer !== null && i === q.correct ? "correct" : ""} ${selected === String(i) && !answer ? "incorrect" : ""}`}
                >
                  <span>{String.fromCharCode(65 + i)}</span>
                  {option}
                  {answer !== null && i === q.correct && <Check size={20} />}
                </button>
              ))}
            </div>
          ) : (
            <Fretboard
              interactive
              disabled={answer !== null}
              showActive={answer !== null}
              string={q.string}
              fret={q.fret}
              onSelect={(s, f) =>
                respond(s === q.string && f === q.fret, `${s}-${f}`)
              }
            />
          )}
          <div aria-live="polite">
            {answer !== null && (
              <div
                className={`answer-feedback ${answer ? "correct" : "incorrect"}`}
              >
                <div>
                  {answer ? <Check size={23} /> : <Lightbulb size={23} />}
                  <strong>
                    {answer
                      ? "正解！ その調子。"
                      : "惜しい！ 一緒に確認しよう。"}
                  </strong>
                </div>
                <p>{q.explanation}</p>
                {q.kind === "board" && !answer && (
                  <p>
                    選んだ位置：{selected?.split("-")[0]}弦・
                    {selected?.split("-")[1] === "0"
                      ? "開放弦"
                      : `${selected?.split("-")[1]}フレット`}
                  </p>
                )}
                <button className="button dark" onClick={next}>
                  {index === ids.length - 1 ? "結果を見る" : "次の問題へ"}
                  <ArrowRight size={16} />
                </button>
              </div>
            )}
          </div>
          {answer === null && (
            <p className="quiz-hint">
              <Lightbulb size={15} />{" "}
              ヒント：上から1弦（G）・2弦（D）・3弦（A）・4弦（E）
            </p>
          )}
        </section>
      )}
    </div>
  );
}
