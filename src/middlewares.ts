import { IRequest, IResponse, INext, IHttpError } from './types';

export function notFound (req: IRequest, res: IResponse, next: INext) {
  throw new Error('Not found.');
}

export function notAllowed (req: IRequest, res: IResponse, next: INext) {
  throw new Error('Method Not allowed.');
}

export function error(err: IHttpError, req: IRequest, res: IResponse, next: INext) {
  const status = err.status || 400;
  res.status(status).json({
    error: err.message,
    reason: err.reason,
    status
  });
}