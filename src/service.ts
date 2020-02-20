import { Repository, IUtil, IProcessFileConfig, IReadable } from './types';

export function Service(repository: Repository, util: IUtil) {
  return {
    async processFile(stream: IReadable, config: IProcessFileConfig) {
      return new Promise(async (done, fail) => {
        // Validation:
        if (config.contentType !== 'application/octet-stream') {
          return fail(new Error('Content-Type must be: \
          application/octet-stream'));
        }

        const provider = config.provider as string;
    
        if (!util.is.string(provider) || util.is.empty(provider)) {
          return fail(new Error('Invalid provider.'));
        }
    
        const columns = config.columns as string;
    
        if (!util.is.string(columns) || util.is.empty(columns)) {
          return fail(new Error('Invalid columns.'));
        }
    
        let nullObject: boolean = false;
    
        if (util.is.string(config.nullObject)) {
          if (util.is.boolean(config.nullObject, true)) {
            nullObject = JSON.parse(config.nullObject);
          } else {
            return fail(new Error('Invalid nullObject option'));
          }
        }
    
        let delimiter: string = ',';
    
        if (util.is.string(config.delimiter)) {
          if (config.delimiter.length !== 0) {
            delimiter = config.delimiter;
          } else {
            return fail(new Error('Invalid delimiter option'));
          }
        }
    
        let quote: string = '"';
    
        if (util.is.string(config.quote)) {
          if (!util.is.empty(config.quote)) {
            quote = config.quote;
          } else {
            return fail(new Error('Invalid quote option'));
          }
        }
    
        let trim: boolean = true;
    
        if (util.is.string(config.trim)) {
          if (util.is.boolean(config.trim, true)) {
            trim = JSON.parse(config.trim);
          } else {
            return fail(new Error('Invalid trim option'));
          }
        }
    
        let ignoreEmpty: boolean = false;
    
        if (util.is.string(config.ignoreEmpty)) {
          if (util.is.boolean(config.ignoreEmpty, true)) {
            ignoreEmpty = JSON.parse(config.ignoreEmpty);
          } else {
            return fail(new Error('Invalid ignoreEmpty option'));
          }
        }
    
        let noHeader: boolean = false;
    
        if (util.is.string(config.noHeader)) {
          if (util.is.boolean(config.noHeader, true)) {
            noHeader = JSON.parse(config.noHeader);
          } else {
            return fail(new Error('Invalid noHeader option'));
          }
        }
    
        let batchSize: number = 1000;
    
        if (util.is.string(config.batchSize)) {
          if (util.is.integer(config.batchSize)) {
            batchSize = parseInt(config.batchSize);
          } else {
            return fail(new Error('batchSize must integer'));
          }
        }
    
        // Procesing:
        const list: any[] = [];
    
        // Create the provider:
        const { _id } = await repository.createProvider(provider);
    
        // Stream used to parse each car line in the csv file as a buffer chunk:
        const processFile = util.csv({
          nullObject,
          delimiter,
          quote,
          trim,
          ignoreEmpty,
          noheader: noHeader,
          includeColumns: new RegExp(columns.replace(/,/gm, '|')),
          headers: columns.split(','),
        });
        
        // Stream used to insert each car already parsed by the csv stream:
        const batchInsert = new util.Writable({
          async write(chunk, encoding, callback) {
            try {
              list.push({ provider: _id, ...JSON.parse(chunk.toString()) });
              if (list.length % batchSize === 0) {
                stream.pause();
                await repository.insertCars(list);
                list.length = 0;
                stream.resume();
              }
              callback();
            } catch (err) {
              batchInsert.emit('error', err);
              callback(err);
            }
          }
        });
    
        const checkSpareItems = async () => {
          if (list.length > 0) {
            try {
              stream.pause();
              await repository.insertCars(list);
              stream.resume();
              batchInsert.emit('close');
            } catch (error) {
              batchInsert.emit('error');
            }
          } else {
            batchInsert.emit('close');
          }
        }
        
        stream
          .pipe(processFile)
          .pipe(batchInsert)
          .on('finish', checkSpareItems)
          .on('close', () => done({ msg: 'ok' }))
          .on('error', fail);
      });
    },

    async getProviders(querstring: { [key: string]: any }) {
      return await repository.getProviders(querstring);
    },
    
    async getProvider(id: string, querstring: { [key: string]: any }) {
      return await repository.getProviderById(id, querstring);
    },
  
    async getCars(querstring: { [key: string]: any }) {
      return await repository.getCars(querstring);
    },
    
    async getCar(id: string, querstring: { [key: string]: any }) {
      return await repository.getCarById(id, querstring);
    }
  };
}