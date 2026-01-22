import { env } from "$env/dynamic/private";
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "./schema";

const { DATABASE_URL } = env;

const poolConnection = mysql.createPool(DATABASE_URL);

export const db = drizzle(poolConnection, { schema });
export type DB = typeof db;
