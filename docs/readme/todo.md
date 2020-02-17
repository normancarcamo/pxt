# TODO:

- Use a framework for SQL due to this project uses SQLite
- Use Prepared Statements instead of concatenated values
- It would be better to use mongo instead of SQLite due the dynamic schema layout of the columns.
- Limit/handle large files uploaded
- Add jsdoc to document the code
- Use POSTMAN to document the endpoints of the API
- Achieve more than 80% of the test coverage of integration testing
- Prepare the diagrams of the app lifecycle
- Create a simple interface to upload files using drag & drop and and/or a button. (Use react)
- Queries including "LIKE" clause through the req.query object must accept multiple files (If needed)
  ```js
  // Like only allows one key into an object, for example:
  // like.["vin"] is going to be ignored due to it perform an scan on the first key found.
  // also the reason is because in the WHERE clause currently I am supporting one field.
  const querystring = { like: { name: 'azda', vin: '23234D' } }

  ```
- The code and tests can be improved by applying function programming style and concepts of course.
  With that we will avoid the usage us mocks in our tests, also because we will be using Dependency Injection the code can be tested in isolation.
- TSLint