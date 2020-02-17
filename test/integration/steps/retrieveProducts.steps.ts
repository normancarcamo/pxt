import { defineFeature, loadFeature } from 'jest-cucumber';
import supertest from 'supertest';
import app from 'src/app';
import fs from 'fs';

const retrieveInfo = loadFeature('test/integration/features/retrieveProducts.feature');
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
  test('User can retrieve a list of products', ({ given, when, then }) => {
    let endpoint: string;
    let result: any[];

    given('the endpoint /v1/products', () => {
      endpoint = '/v1/products';
    });
    when('the request is sent', async () => {
      await uploadFiles();
      const res = await request.get(endpoint);
      result = res.body;
    });
    then('the server responds with a list of products', () => {
      expect(result).not.toBeEmpty();
    });
  });
  test('User can retrieve a list of products filtered', ({ given, when, then, and }) => {
    let endpoint: string;
    let querystring: string;
    let result: any[];

    given('the endpoint /v1/products', () => {
      endpoint = '/v1/products';
    });
    and('the querystring is: ?like[make]=yota', () => {
      querystring = '?like[make]=yota';
    });
    when('the request is sent', async () => {
      await uploadFiles();
      const res = await request.get(endpoint + querystring);
      result = res.body;
    });
    then('the server responds with a list of products including Toyota', () => {
      expect(result[0].make).toEqual('Toyota');
    });
  });
  test('User can retrieve a list of products empty on not found', ({ given, when, then, and }) => {
    let endpoint: string;
    let querystring: string;
    let result: any[];

    given('the endpoint /v1/products', () => {
      endpoint = '/v1/products';
    });
    and('the querystring is: ?like[make]=kkkk', () => {
      querystring = '?like[make]=kkkk';
    });
    when('the request is sent', async () => {
      await uploadFiles();
      const res = await request.get(endpoint + querystring);
      result = res.body;
    });
    then('the server responds with a list of products empty', () => {
      expect(result).toHaveLength(0);
    });
  });
  test('User can get a single product', ({ given, when, then, and }) => {
    let endpoint: string;
    let productId: string;
    let result: any;

    given('the endpoint /v1/products', () => {
      endpoint = '/v1/products';
    });
    and('the product is 1', () => {
      productId = '1';
    });
    when('the request is sent', async () => {
      await uploadFiles();
      const res = await request.get(endpoint + '/' + productId);
      result = res.body;
    });
    then('the server responds with a product', () => {
      expect(result.make).toBeDefined().not.toBeEmpty();
    });
  });
});