import { getDb } from "@/lib/mongodb";
import { isLinkId, links, type ClickCounts } from "@/lib/links";

type ClickDoc = { _id: string; count: number };

async function clicksCollection() {
  const db = await getDb();
  return db.collection<ClickDoc>("clicks");
}

// 모든 링크의 클릭 수를 한 번에 돌려줍니다. 예: { "github": 43, "linkedin": 0, ... }
export async function GET() {
  try {
    const docs = await (await clicksCollection())
      .find({ _id: { $in: links.map((link) => link.id) } })
      .toArray();

    const counts = Object.fromEntries(links.map((link) => [link.id, 0])) as ClickCounts;
    for (const doc of docs) {
      if (isLinkId(doc._id)) counts[doc._id] = doc.count;
    }

    return Response.json(counts);
  } catch (error) {
    console.error("클릭 수 조회 실패:", error);
    return Response.json({ error: "클릭 수를 불러오지 못했습니다." }, { status: 500 });
  }
}

// 본문 { "id": "github" } 로 해당 링크의 클릭 수를 1 올리고, 새 값을 돌려줍니다.
export async function POST(request: Request) {
  const body: unknown = await request.json().catch(() => null);
  const id = (body as { id?: unknown } | null)?.id;

  if (!isLinkId(id)) {
    return Response.json({ error: "알 수 없는 링크입니다." }, { status: 400 });
  }

  try {
    const doc = await (await clicksCollection()).findOneAndUpdate(
      { _id: id },
      { $inc: { count: 1 } },
      { upsert: true, returnDocument: "after" },
    );

    return Response.json({ id, count: doc?.count ?? 1 });
  } catch (error) {
    console.error("클릭 수 증가 실패:", error);
    return Response.json({ error: "클릭 수를 저장하지 못했습니다." }, { status: 500 });
  }
}
