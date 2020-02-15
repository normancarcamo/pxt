import 'jest-extended';
import 'jest-chain';

declare global {
  namespace jest {
    interface Matchers<R> {
      toBePromise(): { pass: boolean, message(): string };
      toBeError(): { pass: boolean, message(): string };
      toBeJsonWebToken(): { pass: boolean, message(): string };
    }
  }
}