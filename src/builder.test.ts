import builder from './builder';

test('adds a static builder method', () => {
  @builder class Test {}
  expect(Test.builder).toBeDefined();
  expect(Test.builder).toBe(Function);
});

test('builder method not visible on instances', () => {
  @builder class Test {}
  const test = new Test();
  expect(test.builder).toBeUndefined();
});

test('build method returns an instance of the class', () => {
  @builder class Test {}
  expect(Test.builder().build()).toBe(Test);
});

test('property setters available from the builder', () => {
  @builder
  class Test {
    private foo: string = 'bar';
  }

  const testBuilder = Test.builder();
  expect(testBuilder.foo).toBeDefined();
  expect(testBuilder.foo).toBe(Function);
});

xtest('property setters take a properly typed argument', () => {
  @builder
  class Test {
    private foo: string = 'bar';
  }

  const testBuilder = Test.builder();
// todo: research how to get function argument types
  // expect(testBuilder.foo).toHaveArguments(string);
});

test('property setters return the updated builder', () => {
  @builder
  class Test {
    private foo: string = 'bar';
  }

  const testBuilder = Test.builder();
  expect(testBuilder.foo('something')).toBe(builder);
});

test('property setters actually set the property', () => {
  @builder
  class Test {
    public foo: string = 'bar'
  }

  const test = Test.builder().foo('baz').build();
  expect(test.foo).toEqual('baz');
});
