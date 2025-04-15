import { int, sqliteTable, text, check, real, index } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const logsTable = sqliteTable(
  "logs", {
  id: int().primaryKey({ autoIncrement: true }),
  reps: int().notNull(),
  weight: real().notNull(),
  exerciseId: int().references(() => exerciseTable.id, { onDelete: "cascade" }),
  date: int().notNull().default(Date.now()),
},
  (table) => [
    index("date_idx").on(table.date),
    index("exercise_id_idx").on(table.exerciseId),
  ]
);

export const exerciseTable = sqliteTable(
  "exercises", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  category: text().notNull(),
  is_tracked: int().notNull().default(0),
  is_user_added: int().notNull().default(0),
  date_added: int().notNull().default(Date.now()),
},
  (table) => [
    check("user_added_check", sql`${table.is_user_added} IN (0, 1)`),
    check("tracked_check", sql`${table.is_tracked} IN (0, 1)`),

  ]
);