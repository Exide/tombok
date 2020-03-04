type IBuilder<T> = {
  [k in keyof T]-?: (arg: T[k]) => IBuilder<T>
}
& {
  build(): T
};

type Constructor<T = {}> = new (...args: any[]) => T;

export function builder<T extends Constructor>(Base: T) {
  return class extends Base {
  /**
   * Create a Builder for a class. Returned objects will be of the class type.
   *
   * e.g. let obj: MyClass = MyClass.builder().a(5).b('str').build();
   * @param type The class to instantiate.
   * @param {Partial<T>} [template] Class partial which the builder will derive initial params from.
   */
    public static builder(template?: Partial<T>): IBuilder<T> {
      const typeConstructor = Base.prototype.constructor as Constructor<T>;
      const built: any = template ? Object.assign({}, template) : {};

      const builder = new Proxy(
        {},
        {
          get(target: any, prop: string) {
            if ('build' === prop) {
              // Instantiate the input class with props
              const obj: T = new typeConstructor();
              return () => Object.assign(obj, {...built});
            }

            return (x: any): any => {
              built[prop] = x;
              return builder as IBuilder<T>;
            };
          }
        }
      );

      return builder as IBuilder<T>;
    }
  }
}
