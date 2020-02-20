import { Request, Response, NextFunction } from 'express';
import { HttpError } from './helpers';
import { Is } from '@ncardez/is';
import { Database } from './db';
import csv from 'csvtojson';
import { Writable, Readable } from 'stream';

export interface Service {
  processFile(req: any, res: any): Promise<{ msg: string } | HttpError>;
  getProviders(query: any): Promise<any>;
  getProvider(id: string, query: any): Promise<any>;
  getCars(query: any): Promise<any>;
  getCar(id: string, query: any): Promise<any>;
}

export interface Repository {
  createProvider(name: string): Promise<any>;
  getProviders(query: any): Promise<any>;
  getProviderById(id: string, query: any): Promise<any>;
  insertCars(list: any[]): Promise<any>;
  getCars(query: any): Promise<any>;
  getCarById(id: string, query: any): Promise<any>;
}

export interface IProcessFileConfig {
  provider: string
  columns: string
  nullObject?: any
  delimiter?: any
  quote?: any
  trim?: any
  ignoreEmpty?: any
  noHeader?: any
  batchSize?: any
  contentType?: string
}

export interface IRequest extends Request {}

export interface IResponse extends Response {}

export interface INext extends NextFunction {}

export interface IDatabase extends Database {}

export interface IWritable extends Writable {}

export interface IReadable extends Readable {}

export interface IUtil {
  is: Is;
  csv: typeof csv;
  HttpError: typeof HttpError;
  Writable: typeof Writable;
}

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

export interface IHttpError extends HttpError {}