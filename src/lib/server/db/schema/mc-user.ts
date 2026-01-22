import { char, mysqlTable, timestamp } from "drizzle-orm/mysql-core";

export const mcuser = mysqlTable("mcuser", {
  id: char("mcid", { length: 32 }).notNull().primaryKey().unique(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});
