import { builder } from './builder';
import {types as utilTypes} from 'util';

interface Testing {
  a: number;
  b: string;
  c: boolean;
  d?: number;
}

test('adds a static builder method', () => {
  @builder class Test {}
  expect(Test.builder).toBeDefined();
  expect(Test.builder).toBeInstanceOf(Function);
});

test('builder method not visible on instances', () => {
  @builder class Test {}
  const test = new Test();
  expect(test.builder).toBeUndefined();
});

test('build method returns an instance of the class', () => {
  @builder class Test {}
  const built = Test.builder().build();
  expect(built.constructor.name).toBe('Test');
});

test('property setters available from the builder', () => {
  @builder
  class Test {
    private foo: string = 'bar';
  }

  const testBuilder = Test.builder();
  expect(testBuilder.foo).toBeDefined();
  expect(testBuilder.foo).toBeInstanceOf(Function);
});

test('property setters take a properly typed argument', () => {
  @builder
  class Test implements Testing {
    private a: number;
    private b: string;
    private c: boolean;
  }

  const testBuilder = Test.builder();
  expect(testBuilder.a).toBeDefined();
  expect(testBuilder.b).toBeDefined();
  expect(testBuilder.c).toBeDefined();

// todo: research how to get function argument types
  // expect(testBuilder.foo).toHaveArguments(string);
});

test('property setters return the updated builder', () => {
  @builder
  class Test {
    private foo: string = 'bar';
  }

  const testBuilder = Test.builder();
  expect(utilTypes.isProxy(testBuilder)).toBeTruthy();
  expect(utilTypes.isProxy(testBuilder.foo('something'))).toBeTruthy();
});

test('property setters actually set the property', () => {
  @builder
  class Test implements Testing {
    public a!: number;
    public b!: string;
    public c!: boolean;
  }

  const testBuilder = Test.builder()
      .a(10)
      .b('abc')
      .c(true);

  const built = testBuilder.build();
  expect(built).toEqual({
    a: 10,
    b: 'abc',
    c: true
  });
});

test('calling builder from static method within decorated class', () => {
  @builder
  class Test {
    private foo: string = 'bar';

    public static simple(): Test {
      return Test.builder().foo('baz').build();
    }
  }

  expect(Test.simple).toBeDefined();
  const testBuilder = Test.simple();
  expect(testBuilder.foo).toBe('baz');
});
