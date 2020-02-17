**Version 1.0.0**

# PXT - Autofit

A product that receives potentially large files in CSV format, process them and
import their data into sqlite as database. However, providers do not all use 
the same layout of columns. The order may differ between providers, 
they may only send a subset of the columns, or they may include additional 
columns we do not wish to capture.

Backend application codebase using the following stack:

- Node.js
- TypeScript
- Nodemon
- Babel 7
- Express.js
- docker
- SQLite

## Try it in development env:
```bash
git clone https://github.com/normancarcamo/pxt.git
cd pxt
npm install
npm run dev
```

## Try it in production env:
```bash
git clone https://github.com/normancarcamo/pxt.git
cd pxt
npm install
npm run build
npm run start
```

## upload files:

## UPLOAD FILES FROM TERMINAL:

To test you can use "curl" tool:

### dataset: autofit.csv

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

### dataset: automundo.csv

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

### dataset: autopromo.csv

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

-------------------------------------------------------------------

## Retrieve data:

The app currently have 5 endpoints backed by: localhost:3000/v1

- /v1/upload -> process the csv file
- /v1/providers -> Retrieve all the providers
- /v1/providers/:provider -> Retrieve a provider
- /v1/products -> Retrieve all the products
- /v1/products/:product -> Retrieve a product

## Pending - TODO:

- Testing using ATTD (Cucumber + Gherkin). :( I couldn't add them on time
- Add datalizer to use schemas.
- Use a framework for SQL due to this project uses SQLite
- Use Prepared Statements instead of concatenated values
- Limit the size of the file uploaded
- Queries including "LIKE" clause through the req.query object must accept multiple files (If needed)
  ```js
  // Like only allows one key into an object, for example:
  // like.["vin"] is going to be ignored due to it perform an scan on the first key found.
  // also the reason is because in the WHERE clause currently I am supporting one field.
  const querystring = { like: { name: 'azda', vin: '23234D' } }

  ```
- It would be better to use mongo instead of SQLite due the dynamic schema layout of the columns.
- The code and tests can be improved by applying function programming style and concepts of course.
  With that we will avoid the usage us mocks in our tests, 
also because we will be using Dependency Injection the code can be tested in isolation.
- Sometimes it's not a good idea sending the real error reasons to the clients produced in the backend code, a better solution is the usage of internal codes, for example:
  ```
  { success: false, error: 'PF01' }
  ```
  Here we can see the error key in the json object sent to the client, the code might only concern to the IT department, PF is just an acronym for "Process File" and "01" is the direct path.
  For example:
  ```js
  // code of a router handler:
  router.post('/api/v1/files', function(req, res, next) {
    if (!req.files) {
      throw new Error('PF01');
    } else else if (!Array.isArray(req.files)) {
      throw new Error('PF02');
    } else {
      res.json({ success: true, message: 'ok' });
    }
  });

  // error handler centralized for the whole app:
  function hanler(error, req, res, next) {
    res.json({ success: false, message: error.message });
  }
  ```
  By doing that we hide sensitive information, for example: in development environment, we could send the stack error for obviously reasons, but in production environment, we would not do it.
  And as a last point if this is applied, we will have to document the process, each error code sent to the client, this way, the frontend code checks for each code documented so that way the developers in the frontend code can know the real reason of the error and present the proper message error.
  It looks like more job than a simple error message, but for security reason this solution can be considered, also, it's subjetive and the solution can be debatable.
- Run TSLint
- There are more things to improve, but for now I think it's enough.
- I will improve all these suggestion/tips if it's required.

## Testing:

### Unit testing: 100%
You can execute the unit testing with the help of the 2 npm script commands:

```bash
npm run test:unit
npm run test:unit:coverage
```

`npm run test:unit:coverage` is the same `npm run test:unit` with the --coverage option cli passed.
For the rest of the options you can check the documentation of jest [docs](https://jestjs.io/docs/en/configuration).

### Integration testing: %80
You can execute the unit testing with the help of the 2 npm script commands:

```bash
npm run test:integration
npm run test:integration:coverage
```

`npm run test:integration:coverage` is the same `npm run test:integration` with the --coverage option cli passed.
For the rest of the options you can check the documentation of jest [docs](https://jestjs.io/docs/en/configuration).

## NPM Scripts:
- npm run remove -> remove docs/test logs node_modules package-lock.json
- npm run create -> create dist docs docs/test docs/diagrams logs logs/all logs/err logs/out
- npm install    -> Install npm modules on package.json
- npm run build  -> For production usage
- npm run start  -> For production usage
- npm run dev    -> For development usage

## Contributors

- Norman Carcamo <normancarcamo@gmail.com>

## License & copyright

© Norman Carcamo, Software Developer

Licensed under the [Apache License](LICENSE).