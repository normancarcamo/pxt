import csv, { Options as CsvOptions } from 'csv-parse';

export function parseCSV(data: any, options: CsvOptions): Promise<any> {
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