"use client";

import { useEffect, useState } from "react";
import { links, type ClickCounts, type LinkId } from "@/lib/links";

const initialCounts = Object.fromEntries(links.map((link) => [link.id, 0])) as ClickCounts;

// 서버 값과 화면 값 중 큰 쪽을 남깁니다.
// (응답이 늦게 도착해도 방금 누른 +1이 사라지지 않게 하기 위함)
function mergeCounts(prev: ClickCounts, next: Partial<ClickCounts>): ClickCounts {
  const merged = { ...prev };
  for (const link of links) {
    const value = next[link.id];
    if (typeof value === "number") merged[link.id] = Math.max(prev[link.id], value);
  }
  return merged;
}

export default function LinkList() {
  const [counts, setCounts] = useState<ClickCounts>(initialCounts);

  // 페이지가 열리면 모든 링크의 클릭 수를 한 번에 가져옵니다.
  useEffect(() => {
    const controller = new AbortController();

    fetch("/api/clicks", { signal: controller.signal, cache: "no-store" })
      .then((res) => (res.ok ? (res.json() as Promise<ClickCounts>) : Promise.reject(res.status)))
      .then((data) => setCounts((prev) => mergeCounts(prev, data)))
      .catch((error) => {
        if (!controller.signal.aborted) console.error("클릭 수를 불러오지 못했습니다:", error);
      });

    return () => controller.abort();
  }, []);

  function handleClick(id: LinkId) {
    // 화면에는 바로 +1 하고, 서버 응답이 오면 실제 값으로 맞춥니다.
    setCounts((prev) => ({ ...prev, [id]: prev[id] + 1 }));

    fetch("/api/clicks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
      keepalive: true, // 페이지를 떠나도 요청이 끝까지 전송되도록
    })
      .then((res) => (res.ok ? (res.json() as Promise<{ count: number }>) : Promise.reject(res.status)))
      .then(({ count }) => setCounts((prev) => mergeCounts(prev, { [id]: count })))
      .catch((error) => console.error("클릭 수를 저장하지 못했습니다:", error));
  }

  return (
    <ul className="mt-14 flex w-full flex-col gap-5">
      {links.map((link) => (
        <li key={link.id}>
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleClick(link.id)}
            className="group flex items-center justify-between gap-4 rounded-3xl border border-white/10 bg-[var(--card)] px-7 py-5 shadow-lg shadow-black/25 transition-colors duration-200 hover:bg-[var(--card-hover)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            <span className="flex flex-col gap-1">
              <span className="text-xl text-white">{link.label}</span>
              <span className="text-sm text-white/65">{link.description}</span>
            </span>
            <span className="flex shrink-0 items-center gap-3">
              <span className="rounded-full bg-black/25 px-2.5 py-1 text-sm tabular-nums text-white/90" aria-label={`클릭 ${counts[link.id]}회`}>
                {counts[link.id].toLocaleString("ko-KR")}회
              </span>
              <span
                aria-hidden
                className="text-xl text-white/60 transition-transform duration-200 group-hover:translate-x-1"
              >
                →
              </span>
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
