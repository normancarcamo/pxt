import { IRequest, IResponse, INext } from './types';

export function notFound (req: IRequest, res: IResponse, next: INext) {
  throw new Error('Not found.');
}

export function notAllowed (req: IRequest, res: IResponse, next: INext) {
  throw new Error('Method Not allowed.');
}

export function error(err: Error, req: IRequest, res: IResponse, next: INext) {
  res.json({ error: err.message });
}