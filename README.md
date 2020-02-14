**Version 1.0.0**

# PXT

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

## Try it:
```bash
git clone normancarcamo/pxt.git

cd pxt

npm install

npm run dev
```

## upload files:

TERMINAL FILE UPLOAD EXAMPLES:

### dataset: autofit.csv

```js
// Data as configuration layout:
const data = {
  provider: 'autofit',
  columns: [ 'uuid','vin','make','model','mileage','year','price','zipCode','createdAt','updatedAt' ]
}

// stringify data + encode as URI:
encodeURI(JSON.stringify(data)) 

// Output:
%7B%22provider%22:%22AutoFit%22,%22columns%22:%5B%22uuid%22,%22vin%22,%22make%22,%22model%22,%22mileage%22,%22year%22,%22price%22,%22zipCode%22,%22createdAt%22,%22updatedAt%22%5D%7D
```

To test you can use "curl" tool:

```bash
curl \
--form "dataset=@./datasets/autofit.csv" \
--form "config=%7B%22provider%22:%22autofit%22,%22columns%22:%5B%22uuid%22,%22vin%22,%22make%22,%22model%22,%22mileage%22,%22year%22,%22price%22,%22zipCode%22,%22createdAt%22,%22updatedAt%22%5D%7D" \
-w "\n" \
http://localhost:3000/upload
```

### automundo

```js
// Example of configuration layout:
const data = {
  "provider":"automundo",
  "columns":["uuid","vin","make","model","year"]
}

// The configuration needs to be first stringified & encoded as URI to work:
encodeURI(JSON.stringify(data)) 

// Output:
// %7B%22provider%22:%22automundo%22,%22columns%22:%5B%22uuid%22,%22vin%22,%22make%22,%22model%22,%22year%22%5D%7D

```

To test, you can use "curl" tool:

```bash
curl \
--form "dataset=@./datasets/automundo.csv" \
--form "config=%7B%22provider%22:%22automundo%22,%22columns%22:%5B%22uuid%22,%22vin%22,%22make%22,%22model%22,%22year%22%5D%7D" \
-w "\n" \
http://localhost:3000/upload
```

-------------------------------------------------------------------

## Retrieve data:

The app currently have 5 endpoints backed by: localhost:3000

- /upload -> process the csv file
- /providers -> Retrieve all the providers
- /providers/:provider -> Retrieve a provider
- /products -> Retrieve all the products
- /products/:product -> Retrieve a product

## Pending - TODO:

- Testing using ATTD (Cucumber + Gherkin). :( I couldn't add them on time
- Add datalizer to use schemas.
- Use a framework for SQL due to this project uses SQLite
- Use Prepared Statements instead of concatenated values
- Limit the size of the file uploaded
- Queries including "LIKE" clause through the req.query object must accept multiple files (If needed)
- It would be better to use mongo instead of SQLite due the dynamic schema layout of the columns.
- Run TSLint
- There are more things to improve, but for now I think it's enough.
- I will improve this if it's required.

## NPM Scripts:
- npm run remove -> remove docs/test logs node_modules package-lock.json
- npm run create -> create dist docs docs/test docs/diagrams test test/config logs logs/all logs/err logs/out
- npm install    -> Install npm modules on package.json
- npm run build  -> For production usage
- npm run start  -> For production usage
- npm run dev    -> For development usage

## Contributors

- Norman Carcamo <normancarcamo@gmail.com>

## License & copyright

© Norman Carcamo, Software Developer

Licensed under the [Apache License](LICENSE).