import { char, index, int, mysqlTable, timestamp, unique, varchar } from "drizzle-orm/mysql-core";
import { apikey } from "./auth-schema";
import { mcuser } from "./mc-user";

export const verificationCodes = mysqlTable(
  "verification_codes",
  {
    id: int("id").primaryKey().autoincrement(),
    code: char("code", { length: 6 }),
    expiration: timestamp("expiration").notNull(),

    mcuserId: varchar("mcuser_id", { length: 255 })
      .notNull()
      .references(() => mcuser.id),
    appApiKeyId: varchar("app_api_key_id", { length: 255 })
      .notNull()
      .references(() => apikey.id, { onDelete: "cascade" }),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull()
  },
  (table) => [index("mc_user_app_idx").on(table.appApiKeyId, table.mcuserId), index("code_app_idx").on(table.appApiKeyId, table.code), unique("verification_codes_app_user_unique").on(table.appApiKeyId, table.mcuserId)]
);
