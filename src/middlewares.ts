import { Request, Response, NextFunction } from 'express';

export function notFound (req: Request, res: Response, next: NextFunction) {
  throw new Error('Not found.');
}

export function notAllowed (req: Request, res: Response, next: NextFunction) {
  throw new Error('Method Not allowed.');
}

export function error(
  err: Error, 
  req: Request, 
  res: Response, 
  next: NextFunction
  ) {
  res.json({ error: err.message });
}