import { Request, Response } from "express";
import { Session, SessionData } from "express-session";

// ? Henry maybe wrong here, but req dont have session prop, cookie or locals prop should be used instead
// ? or because now use express-session -> req now have a new prop called session

export type TContext = {
  req: Request & { session: Session & Partial<SessionData> & { userId?: number } };
  res: Response;
};
