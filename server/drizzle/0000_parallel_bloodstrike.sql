CREATE TYPE "public"."users_loginType" AS ENUM('email', 'kakao', 'apple');--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"users_loginType" "users_loginType" DEFAULT 'email' NOT NULL,
	"nickname" text,
	"imageUri" text,
	"kakaoImageUri" text,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	"deletedAt" timestamp,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
