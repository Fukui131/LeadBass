import { lessons } from "@/lib/content";
import { LessonDetail } from "@/components/lesson-detail";
export function generateStaticParams() {
  return lessons.map((l) => ({ id: String(l.id) }));
}
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <LessonDetail id={Number(id)} />;
}
