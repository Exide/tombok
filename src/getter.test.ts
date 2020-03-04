import { getter } from './getter';

class Test {

  @getter
  private foo: string = 'bar';

}

test('creates a function that returns the correct value', () => {
  const instance = new Test();
  expect(instance.getFoo()).toBe('bar');
});
