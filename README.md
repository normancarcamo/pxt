**Version 1.0.0**

# PXT - Autofit

A product that receives potentially large files in CSV format, process them and
import their data into sqlite as database. However, providers do not all use 
the same layout of columns. The order may differ between providers, 
they may only send a subset of the columns, or they may include additional 
columns we do not wish to capture.

### Task

Build an API with a single endpoint that accepts a file upload in the CSV format and the provider
name that sent the file, looks up a configuration defining the column layout and parses the CSV
into either a file or - as a stretch goal - into an in-memory database.


- [Stack](#stack)
- [Testing](/docs/readme/testing.md)
- [Scripts](/docs/readme/scripts.md)
- [Examples](/docs/readme/examples.md)
- [TODO](/docs/readme/todo.md)
- [Contributors](#contributors)
- [License](#License)


## Stack

Backend application codebase using the following stack:

- Node.js
- TypeScript
- Nodemon
- Babel 7
- Express.js
- SQLite
- jest (babel-jest, ts-jest, jest-extended, jest-chain, jest-cucumber)
- Unit testing, Integration testing + Cucumber & Gherkin syntax.

## Contributors

- Norman Carcamo <normancarcamo@gmail.com>

## License

© Norman Carcamo, Software Developer

Licensed under the [Apache License](LICENSE).