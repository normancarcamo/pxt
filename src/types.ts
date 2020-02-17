import { Request, Response, NextFunction } from 'express';
import { Service } from './service';
import { Repository } from './repository';
import { Database } from './db';
import { UploadedFile } from 'express-fileupload';
import { HttpError } from './helpers';
import { Is,  } from '@ncardez/is';
import { Options } from 'csv-parse';

export interface IService extends Service {}

export interface IRepository extends Repository {}

export interface IRequest extends Request {}

export interface IResponse extends Response {}

export interface INext extends NextFunction {}

export interface IUploadedFile extends UploadedFile {}

export interface IDatabase extends Database {}

export interface IUtil {
  is: Is;
  HttpError: typeof HttpError;
  csvParser: (csv: any) => (file: any, options: Options) => Promise<any>;
  csv: any;
  [key: string]: any;
}

export interface IConfig { columns  : string[]; provider : string; }

export interface IHttpErrorOptions {
  name?    : string;
  message? : string;
  reason?  : string;
  status?  : number;
  code?    : number;
  err?     : Error;
  source?  : Error;
  error?   : Error;
  [key : string] : any;
}