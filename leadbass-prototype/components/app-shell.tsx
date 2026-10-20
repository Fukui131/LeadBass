"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  AudioLines,
  House,
  BookOpen,
  SquareCheckBig,
  Guitar,
  Timer,
  ArrowUpRight,
  HelpCircle,
  X,
  ChevronRight,
  Headphones,
} from "lucide-react";
import { useProgress } from "./progress-provider";
const links = [
  { href: "/", label: "ホーム", en: "Home", icon: House },
  { href: "/lessons/", label: "レッスン", en: "Lessons", icon: BookOpen },
  { href: "/quiz/", label: "TAB譜クイズ", en: "Quiz", icon: SquareCheckBig },
  { href: "/practice/", label: "演奏練習", en: "Practice", icon: Guitar },
  { href: "/metronome/", label: "メトロノーム", en: "Metronome", icon: Timer },
];
export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { progress, storageError } = useProgress();
  const [help, setHelp] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const active = links.find((l) =>
    l.href === "/" ? pathname === "/" : pathname.startsWith(l.href),
  ) ?? { label: "演奏結果", en: "Results" };
  useEffect(() => {
    if (help) dialog.current?.showModal();
    else dialog.current?.close();
  }, [help]);
  return (
    <div className="app-shell">
      <a className="skip-link" href="#main">
        コンテンツへスキップ
      </a>
      <aside className="sidebar">
        <Link href="/" className="brand">
          <span className="brand-icon">
            <AudioLines size={23} />
          </span>
          LeadBass<span className="brand-dot">.</span>
        </Link>
        <div className="sidebar-tagline">はじめの一音から。</div>
        <div className="nav-label">YOUR MUSIC JOURNEY</div>
        <nav aria-label="メインナビゲーション">
          {links.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={`nav-item ${(href === "/" ? pathname === "/" : pathname.startsWith(href)) ? "active" : ""}`}
              aria-current={
                (href === "/" ? pathname === "/" : pathname.startsWith(href))
                  ? "page"
                  : undefined
              }
            >
              <Icon size={20} />
              <span>{label}</span>
              {href === "/lessons/" && <span className="nav-count">7</span>}
            </Link>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="side-note">
            <Headphones size={23} />
            <p>
              今日の一音が、
              <br />
              明日のグルーヴに。
            </p>
            <span>自分のペースで、楽しもう。</span>
            <Link href="/practice/">
              少しだけ弾いてみる <ArrowUpRight size={15} />
            </Link>
          </div>
          <button className="help-button" onClick={() => setHelp(true)}>
            <HelpCircle size={18} />
            使い方ガイド
          </button>
          <div className="profile">
            <div className="avatar">B</div>
            <div>
              <strong>ベーシスト見習い</strong>
              <span>マイペースに成長中</span>
            </div>
            <span className="profile-dot" />
          </div>
        </div>
      </aside>
      <div className="main-wrap">
        <header className="topbar">
          <div className="breadcrumb">
            マイスタジオ <ChevronRight size={13} />
            <span>{active.label}</span>
          </div>
          <span className="top-motto">
            <span className="tiny-dot" /> LET’S FIND YOUR GROOVE
          </span>
          <button
            className="mobile-help icon-button"
            onClick={() => setHelp(true)}
            aria-label="使い方ガイド"
          >
            <HelpCircle size={20} />
          </button>
        </header>
        <main id="main" tabIndex={-1}>
          {storageError && (
            <div className="notice">
              ブラウザへの保存が利用できません。この画面では学習を続けられますが、閉じると記録が失われる場合があります。
            </div>
          )}
          {children}
        </main>
        <footer className="footer">
          <span>
            LeadBass{" "}
            <span className="muted">— 小さな一歩から、自分だけの音へ。</span>
          </span>
          <span>
            BEGINNER FRIENDLY <AudioLines size={14} />
          </span>
        </footer>
      </div>
      <dialog
        ref={dialog}
        onCancel={() => setHelp(false)}
        onClick={(e) => {
          if (e.target === dialog.current) setHelp(false);
        }}
        className="help-dialog"
      >
        <button
          className="dialog-close icon-button"
          onClick={() => setHelp(false)}
          aria-label="閉じる"
        >
          <X />
        </button>
        <span className="eyebrow">WELCOME TO LEADBASS</span>
        <h2>はじめの一音を、ここから。</h2>
        <p>
          1. レッスンで楽器とTAB譜の基本を学ぶ。
          <br />
          2. クイズで理解を確かめる。
          <br />
          3. 実物のベースを持って、ガイドに合わせて弾く。
        </p>
        <div className="notice">
          練習前にベースを E・A・D・G
          にチューニングしてください。指板は上から1弦（G）〜4弦（E）です。
        </div>
        <p className="muted small">
          進捗はこのブラウザに保存されます。マイクでの録音・演奏判定は行いません。演奏結果の採点はデモ表示です。
        </p>
        <button className="button primary" onClick={() => setHelp(false)}>
          さあ、はじめよう <ChevronRight size={17} />
        </button>
      </dialog>
    </div>
  );
}
