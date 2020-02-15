import { Request, Response, NextFunction } from 'express';
import { Service } from './service';
import { Repository } from './repository';
import { Database } from './db';
import { UploadedFile } from 'express-fileupload';
import { Util } from './utils';

export interface IService extends Service {}

export interface IRepository extends Repository {}

export interface IRequest extends Request {}

export interface IResponse extends Response {}

export interface INext extends NextFunction {}

export interface IUploadedFile extends UploadedFile {}

export interface IDatabase extends Database {}

export interface IUtil extends Util {}

export interface IConfig { columns  : string[]; provider : string; }