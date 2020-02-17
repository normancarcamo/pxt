# Examples:

---

## Clone and try it for the first time:

### Try it in development env:
```bash
git clone https://github.com/normancarcamo/pxt.git
cd pxt
npm install
npm run dev
```

### Try it in production env:
```bash
git clone https://github.com/normancarcamo/pxt.git
cd pxt
npm install
npm run build
npm run start
```

---

## How to upload files:

### From terminal ("curl" tool):

``dataset: autofit.csv``

```bash
# This dataset includes all the columns suggested in the task:

# dataset: ./files/autofit.csv
# provider: autofit
# columns: uuid,vin,make,model,mileage,year,price,zipCode,createdAt,updatedAt
curl \
--form "dataset=@./files/autofit.csv" \
--form "provider=autofit" \
--form "columns=uuid,vin,make,model,mileage,year,price,zipCode,createdAt,updatedAt" \
-w "\n" \
http://localhost:3000/v1/upload
```

``dataset: automundo.csv``

```bash
# this one is a bit different than the "autofit" dataset, the difference is that this includes less columns:

# dataset: ./files/automundo.csv
# provider: automundo
# columns: uuid,vin,make,model,year

curl \
--form "dataset=@./files/automundo.csv" \
--form "provider=automundo" \
--form "columns=uuid,vin,make,model,year" \
-w "\n" \
http://localhost:3000/v1/upload
```

``dataset: autopromo.csv``

```bash
# this one is almost the same as "automundo.csv" dataset, the difference is the order of their columns:

# dataset: ./files/autopromo.csv
# provider: autopromo
# columns: vin,uuid,make,model,year

curl \
--form "dataset=@./files/autopromo.csv" \
--form "provider=autopromo" \
--form "columns=vin,uuid,make,model,year" \
-w "\n" \
http://localhost:3000/v1/upload
```

### From javascript code (supertest/superagent example):

```ts
import fs from 'fs';
import supertest from 'supertest';
import app from 'src/app';

const request = supertest.agent(app);
const dataset = fs.readFileSync('files/autopromo.csv');

const res = await request
  .post('/v1/upload')
  .attach('dataset', dataset, 'files/autopromo.csv')
  .field('provider', 'autopromo')
  .field('columns', 'vin,uuid,make,model,year');
```

---

## How to retrieve the data?

The app currently have 5 endpoints under host:port/v1

- `localhost:3000/v1/upload`               - process the csv file
- `localhost:3000/v1/providers`            - Retrieve all the providers
- `localhost:3000/v1/providers/:provider`  - Retrieve a provider
- `localhost:3000/v1/products`             - Retrieve all the products
- `localhost:3000/v1/products/:product`    - Retrieve a product

---
