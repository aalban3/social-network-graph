import neo4j from "neo4j-driver";
import dotenv from "dotenv";
dotenv.config();

const driver: typeof neo4j.Driver = neo4j.driver(
  process.env.NEO_DATABASE_URL || "",
  neo4j.auth.basic(
    process.env.NEO_DATABASE_USERNAME || "",
    process.env.NEO_DATABASE_PASSWORD || ""
  )
);

export const session = driver.session();
export default driver;
