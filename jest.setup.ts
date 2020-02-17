import 'jest-extended';
import 'jest-chain';
import is from '@ncardez/is';

expect.extend({
  toBePromise (received: any): { pass: boolean, message(): string } {
    if (is.promise(received)) {
      return {
        pass: true, 
        message: () => ''
      };
    } else {
      return {
        pass: false,
        message: () => `Expected to be Promise, but got: ${received}`
      };
    }
  },
  toBeError (received: any): { pass: boolean, message(): string } {
    if (is.error(received)) {
      return {
        pass: true, 
        message: () => ''
      };
    } else {
      return {
        pass: false,
        message: () => `Expected to be Error, but got: ${received}`
      };
    }
  },
  toBeJsonWebToken (received: any): { pass: boolean, message(): string } {
    if (is.jsonwebtoken(received)) {
      return {
        pass: true, 
        message: () => ''
      };
    } else {
      return {
        pass: false,
        message: () => `Expected to be a string signature of Json Web Token, but got: ${received}`
      };
    }
  }
});

process.on('unhandledRejection', (err:any) => {
  console.error('TestSuite: unhandledRejection ->', err.message);
});

process.on('uncaughtException', (err:any) => {
  console.error('TestSuite: uncaughtException ->', err.message);
});