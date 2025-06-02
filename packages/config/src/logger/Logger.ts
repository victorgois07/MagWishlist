import winston from "winston";

const { combine, timestamp, printf, colorize } = winston.format;

const logFormat = printf(({ level, message, timestamp, ...metadata }) => {
  let msg = `${timestamp} [${level}]: ${message}`;
  if (Object.keys(metadata).length > 0) {
    msg += ` ${JSON.stringify(metadata)}`;
  }
  return msg;
});

export class Logger {
  private static instance: winston.Logger;

  private constructor() {}

  public static getInstance(): winston.Logger {
    if (!Logger.instance) {
      Logger.instance = winston.createLogger({
        level: process.env.LOG_LEVEL || "info",
        format: combine(timestamp(), colorize(), logFormat),
        transports: [
          new winston.transports.Console(),
          new winston.transports.File({
            filename: "logs/error.log",
            level: "error",
          }),
          new winston.transports.File({
            filename: "logs/combined.log",
          }),
        ],
      });
    }
    return Logger.instance;
  }

  public static info(message: string, metadata?: Record<string, any>): void {
    Logger.getInstance().info(message, metadata);
  }

  public static error(message: string, metadata?: Record<string, any>): void {
    Logger.getInstance().error(message, metadata);
  }

  public static warn(message: string, metadata?: Record<string, any>): void {
    Logger.getInstance().warn(message, metadata);
  }

  public static debug(message: string, metadata?: Record<string, any>): void {
    Logger.getInstance().debug(message, metadata);
  }
}
