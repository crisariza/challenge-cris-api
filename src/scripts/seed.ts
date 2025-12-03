import { connectDatabase, syncDatabase } from "../config/database";
import { seedMockData } from "../utils/seed-data";

const seedDatabase = async (): Promise<void> => {
  try {
    console.log("Connecting to database...");
    await connectDatabase();

    console.log("Syncing database (this will drop existing tables)...");
    await syncDatabase(true);

    await seedMockData();

    console.log("Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
