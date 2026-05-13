CREATE SCHEMA "main";
--> statement-breakpoint
CREATE TABLE "main"."orders" (
	"id" bigint PRIMARY KEY NOT NULL,
	"user_id" bigint NOT NULL,
	"product_id" bigint NOT NULL,
	"amount" numeric(14, 2) NOT NULL,
	"status" varchar(32) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "main"."products" (
	"id" bigint PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"sku" varchar(64),
	"price" numeric(14, 2) NOT NULL,
	"status" varchar(32),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "main"."users" (
	"id" bigint PRIMARY KEY NOT NULL,
	"tags_str" varchar(512),
	"bio" text,
	"avatar_url" varchar(512),
	"extra_json" jsonb
);
