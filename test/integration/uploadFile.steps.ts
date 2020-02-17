import { defineFeature, loadFeature } from 'jest-cucumber';
import supertest from 'supertest';
import app from 'src/app';
import fs from 'fs';

const uploadFileFeature = loadFeature('test/integration/uploadFile.feature');
const request = supertest.agent(app);

defineFeature(uploadFileFeature, (test) => {
  test('User gets OK after file is uploaded', ({ given, when, then }) => {
    let dataset: any;
    let result: string;

    given('a dataset file', () => {
      dataset = fs.readFileSync('files/autopromo.csv');
    });
    when('the file is uploaded', async () => {
      const res = await request
        .post('/v1/upload')
        .attach('dataset', dataset, 'files/autopromo.csv')
        .field('provider', 'autopromo')
        .field('columns', 'vin,uuid,make,model,year');
      result = res.text;
    });
    then('the server responds with status 200', () => {
      expect(result).toEqual('OK');
    });
  });
  test('User gets OK on different sort of columns', ({ given, when, then, and }) => {
    let dataset: any;
    let columns: string;
    let result: string;

    given('a dataset file', () => {
      dataset = fs.readFileSync('files/autopromo.csv');
    });
    and('columns in dataset are: uuid,vin,make,model,year', () => {

    });
    and('columns in configuration are: model,make,year,uuid,vin', () => {
      columns = 'model,make,year,uuid,vin';
    });
    when('the file is uploaded', async () => {
      const res = await request
        .post('/v1/upload')
        .attach('dataset', dataset, 'files/autopromo.csv')
        .field('provider', 'autopromo')
        .field('columns', columns);
      result = res.text;
    });
    then('the server responds with OK', () => {
      expect(result).toEqual('OK');
    });
  });
  test('User gets error on invalid columns', ({ given, when, then, and }) => {
    let dataset: any;
    let columns: string;
    let result: { [key: string]: any };

    given('a dataset file', () => {
      dataset = fs.readFileSync('files/autopromo.csv');
    });
    and('columns in dataset are: uuid,vin,make,model,year', () => {

    });
    and('columns in configuration are: id,vin,make,model', () => {
      columns = 'id,vin,make,model';
    });
    when('the file is uploaded', async () => {
      const res = await request
        .post('/v1/upload')
        .attach('dataset', dataset, 'files/autopromo.csv')
        .field('provider', 'autopromo')
        .field('columns', columns);
      result = { status: res.status, ...res.body };
    });
    then('the server responds with error', () => {
      expect(result.status).toBeDefined().toBeGreaterThanOrEqual(400);
    });
  });
  test('User gets error on invalid provider', ({ given, when, then, and }) => {
    let dataset: any;
    let name: string;
    let result: { [key: string]: any };

    given('a dataset file', () => {
      dataset = fs.readFileSync('files/autopromo.csv');
    });
    and('provider name is empty', () => {
      name = '';
    });
    when('the file is uploaded', async () => {
      const res = await request
        .post('/v1/upload')
        .attach('dataset', dataset, 'files/autopromo.csv')
        .field('provider', name)
        .field('columns', 'uuid,vin,make,model,year');
      result = res.body;
    });
    then('the server responds with error', () => {
      expect(result.status).toBeDefined().toBeGreaterThanOrEqual(400);
    });
  });
  test('User gets error on invalid dataset', ({ given, when, then }) => {
    let dataset: any;
    let result: { [key: string]: any };

    given('a dataset file', () => {
      dataset = fs.readFileSync('files/autos.csv');
    });
    when('the file is uploaded', async () => {
      const res = await request
        .post('/v1/upload')
        .attach('dataset', dataset, 'files/autos.csv')
        .field('provider', 'autos')
        .field('columns', 'uuid,vin,make,model,year');
      result = res.body;
    });
    then('the server responds with error', () => {
      expect(result.status).toBeDefined().toBeGreaterThanOrEqual(400);
    });
  });
  test('User gets error on invalid configuration', ({ given, when, then, and }) => {
    let dataset: any;
    let result: { [key: string]: any };

    given('a dataset file', () => {
      dataset = fs.readFileSync('files/autos.csv');
    });
    and('configuration is empty', () => {});
    when('the file is uploaded', async () => {
      const res = await request
        .post('/v1/upload')
        .attach('dataset', dataset, 'files/autos.csv')
      result = res.body;
    });
    then('the server responds with error', () => {
      expect(result.status).toBeDefined().toBeGreaterThanOrEqual(400);
    });
  });
});