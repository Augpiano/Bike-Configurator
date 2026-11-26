import { Request, Response, NextFunction } from "express";

const logger = (req: Request, res: Response, next: NextFunction) => {
    const { method, url } = req;
    const date = new Date().toISOString();
    console.log(`${date}: ${method} ${url}`);
    next();
};

export default logger;