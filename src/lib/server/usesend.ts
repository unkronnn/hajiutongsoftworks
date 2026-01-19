import { env } from "$env/dynamic/private";
import { UseSend } from "usesend-js";

const { USESEND_API_KEY, USESEND_BASE_URL } = env;

// Email service is now optional for landing page
export const usesend = USESEND_API_KEY && USESEND_BASE_URL ? new UseSend(USESEND_API_KEY, USESEND_BASE_URL) : null;
