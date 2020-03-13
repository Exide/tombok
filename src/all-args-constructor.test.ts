import { allArgsConstructor } from './all-args-constructor';

test('constructor takes all properties as arguments', () => {
  @allArgsConstructor
  class Test {
    public foo = 'bar';
    public bar = 'baz';
  }

  const instance = new Test('baz', 'foo');
  expect(instance.foo).toEqual('baz');
  expect(instance.bar).toEqual('foo');
});

test('constructor takes single object as argument', () => {
  @allArgsConstructor
  class Test {
    public foo = 'bar';
  }

  const input = new Map<string, any>();
  input.set('foo', 'baz');

  const instance = new Test(input);
  expect(instance.foo).toEqual('baz');
});

test('works with private properties', () => {
  @allArgsConstructor
  class Test {
    private _secret = 'im an alien';
    public get secret() { return this._secret }
  }

  const instance = new Test('im from outerspace');
  expect(instance.secret).toEqual('im from outerspace');
});
