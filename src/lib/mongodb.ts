import { MongoClient } from "mongodb";

// 개발 모드에서는 코드가 바뀔 때마다 모듈이 다시 실행되므로,
// 연결을 전역에 보관해 연결이 계속 늘어나지 않게 합니다.
const globalForMongo = globalThis as typeof globalThis & {
  _mongoClientPromise?: Promise<MongoClient>;
};

// 실제로 DB가 필요할 때 처음 연결합니다.
// (파일을 불러올 때 바로 검사하면, 환경 변수가 없는 빌드 단계에서 배포가 실패합니다)
function getClient() {
  if (!globalForMongo._mongoClientPromise) {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error("MONGODB_URI 환경 변수가 없습니다. .env.local 또는 배포 환경 설정을 확인하세요.");
    }
    globalForMongo._mongoClientPromise = new MongoClient(uri).connect().catch((error) => {
      // 연결에 실패하면 다음 요청에서 다시 시도할 수 있게 비워 둡니다.
      globalForMongo._mongoClientPromise = undefined;
      throw error;
    });
  }
  return globalForMongo._mongoClientPromise;
}

export async function getDb() {
  const client = await getClient();
  return client.db(); // URI에 적힌 데이터베이스(linknamu)를 사용
}
