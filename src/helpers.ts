import { IHttpErrorOptions } from './types';
import is from '@ncardez/is';

export class HttpError extends Error {
  name    : string = 'HttpError';
  stack?  : string;
  reason? : string;
  status? : number = 500;
  code?   : number;
  err?    : Error;
  source? : Error;
  error?  : Error;
  [key : string] : any;

  constructor(message : string, options? : IHttpErrorOptions | Error) {
    super(message)/* istanbul ignore next */;
    
    if (options instanceof Error) {
      this.reason = options.message;
      this.err = options;
      this.source = options;
      this.error = options;
    } else if (is.object(options)) {
      for (let key in options) {
        this[key] = options[key];
      }
    }

    Error.captureStackTrace(this, HttpError);
  }
}