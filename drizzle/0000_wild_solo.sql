CREATE TABLE `exercises` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`category` text NOT NULL,
	`is_tracked` integer DEFAULT 0 NOT NULL,
	`is_user_added` integer DEFAULT 0 NOT NULL,
	`date_added` integer DEFAULT 1744647704013 NOT NULL,
	CONSTRAINT "user_added_check" CHECK("exercises"."is_user_added" IN (0, 1)),
	CONSTRAINT "tracked_check" CHECK("exercises"."is_tracked" IN (0, 1))
);
--> statement-breakpoint
CREATE TABLE `logs` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`reps` integer NOT NULL,
	`weight` real NOT NULL,
	`exerciseId` integer,
	`date` integer DEFAULT 1744647704012 NOT NULL,
	FOREIGN KEY (`exerciseId`) REFERENCES `exercises`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `date_idx` ON `logs` (`date`);--> statement-breakpoint
CREATE INDEX `exercise_id_idx` ON `logs` (`exerciseId`);