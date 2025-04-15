import { date } from 'drizzle-orm/mysql-core';
import { int } from 'drizzle-orm/sqlite-core';
import { exerciseTable, logsTable } from '@/db/schema';
import { sql, eq, and, gt, lt, desc } from 'drizzle-orm';
import { ExpoSQLiteDatabase, useLiveQuery } from 'drizzle-orm/expo-sqlite';

export function fetchActivityByDay(
  db: ExpoSQLiteDatabase,
  startOfRangeMs: number,
  endOfRangeMs: number
) {
  const res = db.select({
    dayStart: logsTable.date
  })
    .from(logsTable)
    .where(
      and(
        gt(logsTable.date, startOfRangeMs),
        lt(logsTable.date, endOfRangeMs)
      )
    )
    .groupBy(sql`(logs.date / 86400000) * 86400000`);

  return res;
}


export function fetchLogsForDay(db: ExpoSQLiteDatabase, dayStartNumber: number) {
  const res = db.select({
    logId: logsTable.id,
    exerciseId: exerciseTable.id,
    exerciseName: exerciseTable.name,
    date: logsTable.date,
    reps: logsTable.reps,
    weight: logsTable.weight,
  })
    .from(logsTable).where(and(
      gt(logsTable.date, dayStartNumber),
      lt(logsTable.date, dayStartNumber + 86400000)))
    .leftJoin(exerciseTable, eq(logsTable.exerciseId, exerciseTable.id))
    .orderBy(desc(logsTable.date));

  return res
}

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
    .from(exerciseTable).where(eq(exerciseTable.is_tracked, 1))
    .leftJoin(latestLogs, sql`${exerciseTable.id} = ${latestLogs.exerciseId}`)
    .leftJoin(logsTable, sql`
    ${logsTable.exerciseId} = ${latestLogs.exerciseId}
    AND ${logsTable.date} = ${latestLogs.latestDate}
  `).groupBy(exerciseTable.id).orderBy(exerciseTable.id);

  return res
}

export function fetchAllExercises(db: ExpoSQLiteDatabase) {
  const res = db.select().from(exerciseTable)
  return res
}

export async function addLog(db: ExpoSQLiteDatabase, data: typeof logsTable.$inferInsert) {
  return await db.insert(logsTable).values(data);
}

export async function addLogsBatch(
  db: ExpoSQLiteDatabase,
  logs: typeof logsTable.$inferInsert[]
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
    .select()
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

export async function addToTrackingList(db: ExpoSQLiteDatabase, exerciseId: number) {
  const res = db.update(exerciseTable).set({ is_tracked: 1 }).where(eq(exerciseTable.id, exerciseId));

  return res;
}

export async function removeFromTrackingList(db: ExpoSQLiteDatabase, exerciseId: number) {
  const res = db.update(exerciseTable).set({ is_tracked: 0 }).where(eq(exerciseTable.id, exerciseId));

  return res;
}

export async function deleteExercise(db: ExpoSQLiteDatabase, exerciseId: number) {
  const res = db.delete(exerciseTable).
    where(and(eq(exerciseTable.id, exerciseId), eq(exerciseTable.is_user_added, 1)));

  return res
}

export async function createExercise(db: ExpoSQLiteDatabase, name: string, category: string) {
  const res = db.insert(exerciseTable).
    values({ name: name, category: category, is_tracked: 1, is_user_added: 1 });

  return res
}