import { IDatabase } from './types';

export function Repository (database: IDatabase) {
  return {
    async insertCars(list: any[]) {
      return await database.models.car.insertMany(list);
    },
  
    async createProvider(name: string) {
      return await database.models.provider.create({ name });
    },

    async getProviders(query: any) {
      try {
        return await database.models.provider.find({}, null, {
          skip: query.skip ? parseInt(query.skip) : 0,
          limit: query.limit ? parseInt(query.limit) : 100
        }).exec();
      } catch (err) {
        throw new Error(`Could not get the providers.`);
      }
    },
  
    async getProviderById(id: string, query: any) {
      try {
        return await database.models.provider.findById(id, null, query).exec();
      } catch (err) {
        throw new Error(`Could not get the provider.`);
      }
    },

    async getCars(query: any) {
      try {
        return await database.models.car.find({}, null, {
          skip: query.skip ? parseInt(query.skip) : 0,
          limit: query.limit ? parseInt(query.limit) : 100
        }).exec();
      } catch (err) {
        throw new Error(`Could not get the cars.`);
      }
    },
  
    async getCarById(id: string, query: any) {
      try {
        return await database.models.car.findById(id, null, query).exec();
      } catch (err) {
        throw new Error(`Could not get the car.`);
      }
    }
  };
}