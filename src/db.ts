import sqlite from 'sqlite3';
import is from '@ncardez/is';
import { HttpError } from './helpers';

export class Database {
  private conn: sqlite.Database;

  constructor() {
    // istanbul ignore next
    this.conn = new sqlite.Database(':memory:', (err) => {
      if (err) {
        throw new HttpError("Can't connect to the database", err);
      }

      const handleError = (message: string) => (err: Error) => {
        if (err) {
          throw new HttpError(message, err);
        }
      }
      
      this.conn.run(`
        CREATE TABLE IF NOT EXISTS provider (
          id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
          name TEXT
        )
      `, handleError('Error when was creating the table "provider".'));
    
      this.conn.run(`
        CREATE TABLE IF NOT EXISTS product (
          id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
          id_provider INTEGER NOT NULL,
          CONSTRAINT fk_provider 
          FOREIGN KEY (id) 
          REFERENCES provider (id_provider)
          ON UPDATE CASCADE
          ON DELETE CASCADE
        );
      `, handleError('Error when was creating the table "product".'));
    });
  }

  all(str: string, log?: (s: string) => void): Promise<any[] | Error> {
    return new Promise<any[]>((done, fail) => {
      const stmt = this.cleanStatement(str);
      if (log) log(stmt);
      this.conn.all(stmt, (err: Error, results: any[]) => {
        if (err) {
          fail(err);
        } else {
          done(results);
        }
      });
    });
  }
  
  get(str: string, log?: (s: string) => void): Promise<any | Error> {
    return new Promise<any>((done, fail) => {
      const stmt = this.cleanStatement(str);
      if (log) log(stmt);
      this.conn.get(stmt, (err: Error, result: any) => {
        if (err) {
          fail(err);
        } else {
          done(result);
        }
      });
    });
  }
  
  run(str: string, log?: (s: string) => void): Promise<any | Error> {
    return new Promise<undefined>((done, fail) => {
      const stmt = this.cleanStatement(str);
      if (log) log(stmt);
      return this.conn.run(stmt, (err: Error) => {
        if (err) {
          fail(err);
        } else {
          done();
        }
      });
    });
  }

  cleanStatement(text: string = ''): string {
    const str = text
      .replace(/\n /gm, ' ')
      .trim()
      .replace(/\ +/gm, ' ')
      .trim()
      .replace(' ;', ';')
      .trim();
    
    return str.endsWith(';') ? str : str ? str + ';' : '';
  }

  getOptions(query: { [key: string]: any; }) {
    const optionsAllowed: string[] = [
      'columns',
      'limit',
      'offset',
      'orderBy',
      'sort',
      'like',
    ];
    const options: {
      columns: string;
      limit: string;
      offset: string;
      orderBy: string;
      sort: string;
      like: string
    } = {
      columns: '',
      limit: '',
      offset: '',
      orderBy: '',
      sort: '',
      like: ''
    };
  
    for (const option in query) {
      if (optionsAllowed.includes(option)) {
        if (!is.empty('' + query[option])) {
          if (option === 'columns') {
            options.columns = query.columns;
          }
          if (option === 'limit') {
            options.limit = `LIMIT ${query.limit}`;
          }
    
          if (option === 'offset') {
            if (options.limit) {
              options.offset = `OFFSET ${query.offset}`;
            }
          }
    
          if (option === 'orderBy') {
            options.orderBy = `ORDER BY ${query.orderBy}`;
          }
    
          if (option === 'sort') {
            if (['asc','desc'].includes(query.sort.toLowerCase())) {
              options.sort = query.sort.toUpperCase();
            }
          }
        }

        if (option === 'like') {
          if (is.object(query.like) && !is.empty(query.like)) {
            const key = Object.keys(query.like).shift() as string;
            if (key !== '') {
              options.like = `${key} LIKE '%${query.like[key]}%'`;
            }
          }
        }
      }
    }
  
    return options;
  }
}