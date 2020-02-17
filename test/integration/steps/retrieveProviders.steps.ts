import { defineFeature, loadFeature } from 'jest-cucumber';
import supertest from 'supertest';
import app from 'src/app';
import fs from 'fs';

const retrieveInfo = loadFeature('test/integration/features/retrieveProviders.feature');
const request = supertest.agent(app);
const uploadFiles = async () => {
  let autofit: any = fs.readFileSync('files/autofit.csv');
  let automundo: any = fs.readFileSync('files/automundo.csv');
  let autopromo: any = fs.readFileSync('files/autopromo.csv');
  await request
    .post('/v1/upload')
    .attach('dataset', autofit, 'files/autofit.csv')
    .field('provider', 'autofit')
    .field('columns', 'uuid,vin,make,model,mileage,year,price,zipCode,createdAt,updatedAt'),
  await request
    .post('/v1/upload')
    .attach('dataset', automundo, 'files/automundo.csv')
    .field('provider', 'automundo')
    .field('columns', 'uuid,vin,make,model,year'),
  await request
    .post('/v1/upload')
    .attach('dataset', autopromo, 'files/autopromo.csv')
    .field('provider', 'autopromo')
    .field('columns', 'vin,uuid,make,model,year')
}

defineFeature(retrieveInfo, (test) => {
  test('User can retrieve a list of providers', ({ given, when, then }) => {
    let endpoint: string;
    let result: any[];

    given('the endpoint /v1/providers', () => {
      endpoint = '/v1/providers';
    });
    when('the request is sent', async () => {
      await uploadFiles();
      const res = await request.get(endpoint);
      result = res.body;
    });
    then('the server responds with a list of providers', () => {
      expect(result).toHaveLength(3);
      expect(result[0].name).toEqual('autofit');
      expect(result[1].name).toEqual('automundo');
      expect(result[2].name).toEqual('autopromo');
    });
  });
  test('User can retrieve a list of providers filtered', ({ given, when, then, and }) => {
    let endpoint: string;
    let querystring: string;
    let result: any[];

    given('the endpoint /v1/providers', () => {
      endpoint = '/v1/providers';
    });
    and('the querystring is: ?like[name]=fit', () => {
      querystring = '?like[name]=fit';
    });
    when('the request is sent', async () => {
      await uploadFiles();
      const res = await request.get(endpoint + querystring);
      result = res.body;
    });
    then('the server responds with a list of providers including autofit', () => {
      expect(result).toHaveLength(1);
      expect(result[0].name).toEqual('autofit');
    });
  });
  test('User can retrieve a list of providers empty on not found', ({ given, when, then, and }) => {
    let endpoint: string;
    let querystring: string;
    let result: any[];

    given('the endpoint /v1/providers', () => {
      endpoint = '/v1/providers';
    });
    and('the querystring is: ?like[name]=kkkk', () => {
      querystring = '?like[name]=kkkk';
    });
    when('the request is sent', async () => {
      await uploadFiles();
      const res = await request.get(endpoint + querystring);
      result = res.body;
    });
    then('the server responds with a list of providers empty', () => {
      expect(result).toHaveLength(0);
    });
  });
  test('User can get a single provider', ({ given, when, then, and }) => {
    let endpoint: string;
    let providerId: string;
    let result: any;

    given('the endpoint /v1/providers', () => {
      endpoint = '/v1/providers';
    });
    and('the provider is 1', () => {
      providerId = '1';
    });
    when('the request is sent', async () => {
      await uploadFiles();
      const res = await request.get(endpoint + '/' + providerId);
      result = res.body;
    });
    then('the server responds with a provider', () => {
      expect(result.name).toEqual('autofit');
    });
  });
});