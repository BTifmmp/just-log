import { date } from 'drizzle-orm/mysql-core';
import { int } from 'drizzle-orm/sqlite-core';
import { exerciseTable, logsTable } from '@/db/schema';
import { sql, eq } from 'drizzle-orm';
import { ExpoSQLiteDatabase, useLiveQuery } from 'drizzle-orm/expo-sqlite';


export function fetchTrackedExerciseWithLatestLog(db: ExpoSQLiteDatabase) {
  const latestLogs = db
    .select({
      exerciseId: logsTable.exerciseId,
      latestDate: sql`MAX(${logsTable.date})`.
        as('latest_date'),
    })
    .from(logsTable)
    .groupBy(logsTable.exerciseId)
    .as('latest_logs');

  const res = db
    .select({
      exerciseId: exerciseTable.id,
      name: exerciseTable.name,
      category: exerciseTable.category,
      is_tracked: exerciseTable.is_tracked,
      is_user_added: exerciseTable.is_user_added,
      date_added: exerciseTable.date_added,
      reps: logsTable.reps,
      weight: logsTable.weight,
      last_log_date: logsTable.date,
    })
    .from(exerciseTable).where(eq(exerciseTable.is_tracked, 0))
    .leftJoin(latestLogs, sql`${exerciseTable.id} = ${latestLogs.exerciseId}`)
    .leftJoin(logsTable, sql`
    ${logsTable.exerciseId} = ${latestLogs.exerciseId}
    AND ${logsTable.date} = ${latestLogs.latestDate}
  `);

  return res
}

export async function addLog(db: ExpoSQLiteDatabase, data: typeof logsTable.$inferInsert) {
  return await db.insert(logsTable).values(data);
}

export async function addLogsBatch(
  db: ExpoSQLiteDatabase,
  logs: { reps: number; weight: number; date: number; exerciseId: number }[]
) {
  const res = await db.insert(logsTable).values(logs);
  return res;
}

export async function deleteLog(db: ExpoSQLiteDatabase, logId: number) {
  const res = await db.delete(logsTable).where(eq(logsTable.id, logId));

  return res
}

export function fetchLogsForExercise(db: ExpoSQLiteDatabase, exerciseId: number) {
  const res = db
    .select({
      id: logsTable.id,
      exerciseId: logsTable.exerciseId,
      reps: logsTable.reps,
      weight: logsTable.weight,
      date: logsTable.date,
    })
    .from(logsTable)
    .where(eq(logsTable.exerciseId, exerciseId));

  return res;
}

export function fetchExercise(db: ExpoSQLiteDatabase, exerciseId: number) {
  const res = db
    .select({
      id: exerciseTable.id,
      name: exerciseTable.name,
      category: exerciseTable.category,
      is_tracked: exerciseTable.is_tracked,
      is_user_added: exerciseTable.is_user_added,
      date_added: exerciseTable.date_added,
    })
    .from(exerciseTable)
    .where(eq(exerciseTable.id, exerciseId));

  return res;
}