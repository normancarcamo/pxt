import { Options } from 'csv-parse';
import { IHttpErrorOptions } from './types';
import is from '@ncardez/is';

export function csvParser(csv: (
  files: any | any[], 
  options: Options, 
  callback: (error: Error | null | undefined, data: any) => void
) => void) {
  return function (file: any | any[], options: Options) {
    return new Promise<any>((done, fail) => {
      try {
        csv(file, options, (err, data) => {
          if (err) {
            fail(new HttpError(`Could not parse the csv file.`, err));
          } else {
            done(data);
          }
        });
      } catch (err) {
        fail(new HttpError(`Could not parse the csv file...`, err));
      }
    });
  }
}

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