import * as fs from "fs";
import path from "path";
import { validateUsers } from "./services/validation";
import { transformUsers } from "./services/transformation";
import { User } from "./core/model";

// Using TEST data from a JSON file
const rawData = fs.readFileSync("./src/tests/testData.json", "utf-8");
const data = JSON.parse(rawData);

// Filtering & validation
const validUsers: Record<string, any>[] = validateUsers(data);

// Transformation
const transformedUsers: User[] = transformUsers(validUsers);

// Store the validated & formatted data in a new JSON file
fs.writeFileSync(
  path.join(__dirname, "results", "result.json"),
  JSON.stringify(transformedUsers, null, 2),
  "utf-8"
);
