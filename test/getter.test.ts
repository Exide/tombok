import { getter } from '../src';

class Test {

  @getter
  private foo: string = 'bar';

}

test('creates a function that returns the correct value', () => {
  const instance = new Test();
  expect(instance.foo).toEqual('bar');
});
