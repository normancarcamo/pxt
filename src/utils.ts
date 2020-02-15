import csv, { Options as CsvOptions } from 'csv-parse';
import { Is } from '@ncardez/is';

export class Util {
  is: Is = new Is();

  parseCSV(data: any, options: CsvOptions): Promise<any> {
    return new Promise<any>((done, fail) => {
      csv(data, options, (err, data) => {
        if (err) {
          fail(err);
        } else {
          done(data);
        }
      });
    });
  }
}
