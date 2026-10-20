import type { Metadata } from "next";
import { AppShell } from "@/components/app-shell";
import { ProgressProvider } from "@/components/progress-provider";
import "./globals.css";
export const metadata: Metadata = {
  title: {
    default: "LeadBass | はじめの一音から。",
    template: "%s | LeadBass",
  },
  description:
    "はじめの一音から、あなたのグルーヴへ。ベース初心者のための学習と演奏練習アプリ。",
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja" data-scroll-behavior="smooth">
      <body>
        <ProgressProvider>
          <AppShell>{children}</AppShell>
        </ProgressProvider>
      </body>
    </html>
  );
}
