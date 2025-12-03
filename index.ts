//? Dependencies
import "dotenv/config";
import server from "./src/server";
import { connectDatabase, syncDatabase } from "./src/config/database";
import { seedMockData } from "./src/utils/seed-data";

const PORT: number = parseInt(process.env["PORT"] || "3000", 10);

const startServer = async (): Promise<void> => {
  try {
    console.log("🔄 Starting API server...");

    await connectDatabase();
    await syncDatabase(false);
    await seedMockData();

    server.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Server failed to start:", error);
    process.exit(1);
  }
};

startServer();

export default server;
