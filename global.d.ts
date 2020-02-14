import 'jest-extended';
import 'jest-chain';

declare global {
  namespace jest {
    interface Matchers<R> {
    }
  }
}