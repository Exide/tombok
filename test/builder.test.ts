import { builder } from '../src'

// @builder
class Test {
  private foo: string = 'bar';
}

test('creates a static builder method and returns a custom builder class', () => {
  // const instance = Test.builder()
  //   .foo('baz')
  //   .build();

  // expect(instance.foo).toEqual('baz');
});
