import { getter } from './getter';

class Test {

  @getter
  private foo: string = 'bar';

}

test('creates a function that returns the correct value', () => {
  const instance = new Test() as any;
  expect(instance.getFoo()).toBe('bar');
});
