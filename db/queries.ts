import { date } from 'drizzle-orm/mysql-core';
import { int } from 'drizzle-orm/sqlite-core';
import { exerciseTable, logsTable } from '@/db/schema';
import { sql, eq, and, gt, lt, desc } from 'drizzle-orm';
import { ExpoSQLiteDatabase, useLiveQuery } from 'drizzle-orm/expo-sqlite';
import { randomColor } from '@/constants/Colors';

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
    .groupBy(sql`logs.date / 86400000`);

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
      color: exerciseTable.color,
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
    values({ name: name, category: category, is_tracked: 1, is_user_added: 1, color: randomColor() });

  return res
}

export async function updateExercise(db: ExpoSQLiteDatabase, id: number, name: string, category: string) {
  const res = db
    .update(exerciseTable)
    .set({ name: name, category: category })
    .where(eq(exerciseTable.id, id));

  return res;
}

export function getDaysActive(db: ExpoSQLiteDatabase) {
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

  const res = db.select({
    monthCount: sql<number>`
    COUNT(CASE WHEN ${logsTable.date} >= ${oneMonthAgo.getTime()} THEN 1 END)
  `.as('month_count'),

    yearCount: sql<number>`
    COUNT(CASE WHEN ${logsTable.date} >= ${oneYearAgo.getTime()} THEN 1 END)
  `.as('year_count'),

    allCount: sql<number>`
    COUNT(${logsTable.date})
  `.as('all_count')
  }).from(db.select()
    .from(logsTable)
    .groupBy(sql`(${logsTable.date} / 86400000)`).as('sq'));

  return res;
}

export function getLogsByCategory(db: ExpoSQLiteDatabase) {
  const res = db
    .select({
      category: exerciseTable.category,
      logCount: sql<number>`COUNT(${logsTable.id})`.as('logCount')
    })
    .from(logsTable)
    .innerJoin(exerciseTable, eq(logsTable.exerciseId, exerciseTable.id))
    .groupBy(exerciseTable.category)
    .orderBy(desc(sql`logCount`));

  return res;
}

export function getAllTimeStats(db: ExpoSQLiteDatabase) {
  const res = db
    .select({
      totalWeight: sql<number>`(SELECT SUM(weight * reps) FROM logs)`,
      totalReps: sql<number>`(SELECT SUM(reps) FROM logs)`
    })
    .from(sql`(SELECT 1)`);
  return res;
}

export function getFavoriteExercises(db: ExpoSQLiteDatabase, limit: number = 5) {
  const res = db
    .select({
      name: exerciseTable.name,
      logCount: sql<number>`COUNT(${logsTable.id})`.as('logCount')
    })
    .from(logsTable)
    .innerJoin(exerciseTable, eq(logsTable.exerciseId, exerciseTable.id))
    .groupBy(logsTable.exerciseId)
    .orderBy(desc(sql`logCount`))
    .limit(limit);

  return res;
}