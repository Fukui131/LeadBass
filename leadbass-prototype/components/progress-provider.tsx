"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
export type HistoryItem = {
  id: string;
  type: "lesson" | "quiz" | "practice";
  title: string;
  date: string;
  detail: string;
  seconds?: number;
};
export type PracticeResult = {
  phraseId: string;
  title: string;
  bpm: number;
  seconds: number;
  cycles: number;
  date: string;
};
type Progress = {
  completed: number[];
  steps: Record<string, number>;
  history: HistoryItem[];
  quizBest: number | null;
  lastResult: PracticeResult | null;
};
const empty: Progress = {
  completed: [],
  steps: {},
  history: [],
  quizBest: null,
  lastResult: null,
};
const KEY = "leadbass-progress-v1";
const Context = createContext<{
  progress: Progress;
  ready: boolean;
  storageError: boolean;
  completeLesson: (id: number, title: string) => void;
  saveStep: (id: number, step: number) => void;
  saveQuiz: (score: number, total: number, review: boolean) => void;
  savePractice: (result: PracticeResult) => void;
}>(null!);
export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<Progress>(empty),
    [ready, setReady] = useState(false),
    [storageError, setStorageError] = useState(false);
  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const p = JSON.parse(raw);
        if (p && Array.isArray(p.completed) && Array.isArray(p.history)) {
          setProgress({
            completed: p.completed.filter(
              (n: unknown) => typeof n === "number" && n >= 1 && n <= 7,
            ),
            steps: p.steps && typeof p.steps === "object" ? p.steps : {},
            history: p.history.filter(
              (h: HistoryItem) =>
                h &&
                typeof h.title === "string" &&
                typeof h.date === "string" &&
                typeof h.detail === "string",
            ),
            quizBest: typeof p.quizBest === "number" ? p.quizBest : null,
            lastResult:
              p.lastResult && typeof p.lastResult.title === "string"
                ? p.lastResult
                : null,
          });
        }
      }
    } catch {
      setStorageError(true);
    }
    setReady(true);
  }, []);
  useEffect(() => {
    if (ready) {
      try {
        localStorage.setItem(KEY, JSON.stringify(progress));
      } catch {
        setStorageError(true);
      }
    }
  }, [progress, ready]);
  const completeLesson = useCallback(
    (id: number, title: string) =>
      setProgress((p) =>
        p.completed.includes(id)
          ? p
          : {
              ...p,
              completed: [...p.completed, id],
              history: [
                {
                  id: crypto.randomUUID(),
                  type: "lesson" as const,
                  title,
                  date: new Date().toISOString(),
                  detail: "レッスン完了",
                },
                ...p.history,
              ],
            },
      ),
    [],
  );
  const saveStep = useCallback(
    (id: number, step: number) =>
      setProgress((p) => ({ ...p, steps: { ...p.steps, [id]: step } })),
    [],
  );
  const saveQuiz = useCallback(
    (score: number, total: number, review: boolean) =>
      setProgress((p) => ({
        ...p,
        quizBest: review
          ? p.quizBest
          : Math.max(p.quizBest ?? 0, Math.round((score / total) * 100)),
        history: [
          {
            id: crypto.randomUUID(),
            type: "quiz" as const,
            title: review ? "TAB譜クイズ・復習" : "TAB譜クイズ",
            date: new Date().toISOString(),
            detail: `${total}問中${score}問正解（${Math.round((score / total) * 100)}%）`,
          },
          ...p.history,
        ],
      })),
    [],
  );
  const savePractice = useCallback(
    (result: PracticeResult) =>
      setProgress((p) => ({
        ...p,
        lastResult: result,
        history: [
          {
            id: crypto.randomUUID(),
            type: "practice" as const,
            title: result.title,
            date: result.date,
            detail: `${result.bpm} BPM · ${result.cycles}回完奏`,
            seconds: result.seconds,
          },
          ...p.history,
        ],
      })),
    [],
  );
  return (
    <Context.Provider
      value={{
        progress,
        ready,
        storageError,
        completeLesson,
        saveStep,
        saveQuiz,
        savePractice,
      }}
    >
      {children}
    </Context.Provider>
  );
}
export const useProgress = () => useContext(Context);
