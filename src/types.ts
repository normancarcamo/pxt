export interface IHttpErrorOptions {
  name?          : string;
  message?       : string;
  reason?        : string;
  status?        : number;
  code?          : number;
  err?           : Error;
  source?        : Error;
  error?         : Error;
  [key : string] : any;
}

export interface ISqlQueryOptions {
  columns : string;
  limit   : string;
  offset  : string;
  orderBy : string;
  sortBy  : string;
  like    : string;
}

export interface IConfig {
  columns  : string[];
  provider : string;
}