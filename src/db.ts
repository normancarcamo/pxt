import sqlite from 'sqlite3';
import is from '@ncardez/is';

export class Connection {
  conn: sqlite.Database;

  constructor() {
    this.conn = new sqlite.Database(':memory:', (err) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log('Connected to SQlite database.');
        
        const handleError = (message: string) => (err: Error) => {
          if (err) {
            const error: any = new Error(message);
            error.original = err;
            throw error;
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
      
        console.log('Tables has been created successfully.');
      }
    });

    this.all = this.all.bind(this);
    this.get = this.get.bind(this);
    this.run = this.run.bind(this);
    this.getOptions = this.getOptions.bind(this);
  }

  all(str: string): Promise<any[]> {
    return new Promise<any[]>((done, fail) => {
      this.conn.all(str, (err: Error, results: any[]) => {
        if (err) {
          fail(err);
        } else {
          done(results);
        }
      });
    });
  }
  
  get(str: string): Promise<any> {
    return new Promise<any>((done, fail) => {
      this.conn.get(str, (err: Error, result: any) => {
        if (err) {
          fail(err);
        } else {
          done(result);
        }
      });
    });
  }
  
  run(str: string): Promise<undefined> {
    return new Promise<undefined>((done, fail) => {
      this.conn.run(str, (err: Error) => {
        if (err) {
          fail(err);
        } else {
          done();
        }
      });
    });
  }

  getOptions(query: { [key: string]: any; }) {
    const optionsAllowed: string[] = [
      'columns',
      'limit',
      'offset',
      'orderBy',
      'sortBy',
      'like',
    ];
    const options: {
      columns: string;
      limit: string;
      offset: string;
      orderBy: string;
      sortBy: string;
      // like: { [key: string]: string } | null
      like: string
    } = {
      columns: '',
      limit: '',
      offset: '',
      orderBy: '',
      sortBy: '',
      like: ''
    };
  
    for (const option in query) {
      if (optionsAllowed.includes(option)) {
        if (is.string(query[option]) && !is.empty(query[option])) {
          if (option === 'columns') {
            options.columns = query.columns;
          }
    
          if (option === 'limit') {
            options.limit = `LIMIT ${query.limit}`;
          }
    
          if (option === 'offset') {
            options.offset = `OFFSET ${query.offset}`;
          }
    
          if (option === 'orderBy') {
            options.orderBy = `ORDER BY ${query.orderBy}`;
          }
    
          if (option === 'sortBy') {
            if (['asc','desc'].includes(query.sortBy.toLocaleLowerCase())) {
              options.sortBy = query.sortBy.toLocaleUpperCase();
            }
          }
        }
  
        // "LIKE" CONDITION CURRENTLY IS ONLY ALLOWING 1 COLUMN, 
        // MULTIPLE COLUMNS ARE NOT HANDLED YET DUE TO REASON OF TIME, 
        // BUT IT CAN BE DONE AFTERWARDS.
        if (option === 'like') {
          if (is.object(query.like) && !is.empty(query.like)) {
            const col: string = Object.keys(query.like).shift() || '';
            if (is.string(col) && !is.empty(col)) {
              options.like = `${col} LIKE '%${query.like[col]}%'`;
            }
          }
        }
      }
    }
  
    return options;
  }
}