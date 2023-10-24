import { sql } from "./db.js";
// sql`DROP TABLE IF EXISTS todos`.then(() => {
//   console.log("table dropped");
// });

sql`
CREATE TABLE todos (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    completed BOOLEAN NOT NULL
);
`.then(() => {
  console.log("table created");
});
