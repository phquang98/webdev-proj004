import dotenv from "dotenv";

dotenv.config();

export const __prod__ = process.env.NODE_ENV === "production";
export const COOKIE_NAME = "posty-cookie";

// --- For MongoDB Session/Cookie ---
export const session_db_username = process.env.SESSION_MONGODB_USERNAME;
export const session_db_pass = process.env.SESSION_MONGODB_PASS;
export const mongoSecret = String(process.env.SESSION_SECRET_DEV_PROD);
