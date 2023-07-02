CREATE TABLE IF NOT EXISTS "categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(64),
	"created" timestamp with time zone DEFAULT now() NOT NULL,
	"modified" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "todos" (
	"id" serial PRIMARY KEY NOT NULL,
	"category_id" integer,
	"title" varchar(256) NOT NULL,
	"description" varchar(1024),
	"due" date,
	"completed" boolean DEFAULT false NOT NULL,
	"deleted" boolean DEFAULT false NOT NULL,
	"created" timestamp with time zone DEFAULT now() NOT NULL,
	"modified" timestamp with time zone
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "name_idx" ON "categories" ("name");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "todos" ADD CONSTRAINT "todos_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
