import { auth } from "$lib/server/auth";
import type { Handle } from "@sveltejs/kit";

export const adminMiddleware: Handle = async ({ event, resolve }) => {
  // Get session from better-auth
  const session = await auth.api.getSession({
    headers: event.request.headers
  });

  // Add user info to locals
  if (session) {
    event.locals.user = session.user;
    event.locals.session = session.session;
  }

  // Check if route requires admin access
  if (event.url.pathname.startsWith("/admin")) {
    if (!session || !session.user) {
      // Not logged in, redirect to login
      return new Response(null, {
        status: 302,
        headers: {
          location: "/login?redirect=/admin"
        }
      });
    }

    // Check if user has admin role
    if (session.user.role !== "admin") {
      // Not an admin, return forbidden
      return new Response("Forbidden: Admin access required", {
        status: 403
      });
    }
  }

  return resolve(event);
};
