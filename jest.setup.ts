expect.extend({});

process.on('unhandledRejection', (err:any) => {
  console.error('TestSuite: unhandledRejection ->', err.message);
});

process.on('uncaughtException', (err:any) => {
  console.error('TestSuite: uncaughtException ->', err.message);
});