import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error("MONGODB_URI 환경 변수가 없습니다. .env.local을 확인하세요.");
}

// 개발 모드에서는 코드가 바뀔 때마다 모듈이 다시 실행되므로,
// 연결을 전역에 보관해 연결이 계속 늘어나지 않게 합니다.
const globalForMongo = globalThis as typeof globalThis & {
  _mongoClientPromise?: Promise<MongoClient>;
};

const clientPromise =
  globalForMongo._mongoClientPromise ?? new MongoClient(uri).connect();

if (process.env.NODE_ENV !== "production") {
  globalForMongo._mongoClientPromise = clientPromise;
}

export async function getDb() {
  const client = await clientPromise;
  return client.db(); // URI에 적힌 데이터베이스(linknamu)를 사용
}
