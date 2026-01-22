import { db } from "$lib/server/db";
import { user } from "$lib/server/db/schema";
import type { RequestEvent } from "@sveltejs/kit";

export const load = async ({ locals }: RequestEvent) => {
  // Get all users from database
  const users = await db.select().from(user).orderBy(user.createdAt);

  return {
    user: locals.user,
    users
  };
};
