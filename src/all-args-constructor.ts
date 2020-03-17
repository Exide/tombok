type Constructor<T = {}> = new (...args: any[]) => T;

/**
 * This decorator generates an all-args constructor for the target class that is
 * annotated with `@allArgsConstructor`.
 * 
 * An all-args constructor requires one argument for every field or a object containing
 * all fields in the class.
 * 
 * Example:
 * ```typescript
 * new Person({
 *   name: 'Adam Savage',
 *   city: 'San Francisco',
 *   job: 'Mythbusters',
 * });
 * ```
 * 
 * Or:
 * ```typescript
 * new Person('Adam Savage', 'San Francisco', 'Mythbusters');
 * ```
 *
 * @param <T> Type of the base class that must contain a constructor
 * @param {T} target Base class that we are going to mutate
 */
export function allArgsConstructor<T extends Constructor>(target: T) {
  // todo: get property key, type, and value if available from Base
  return class TAllArgsConstructor extends target {
    // todo: set constructor arguments to typed arguments matching target properties, in the same order declared
    constructor(...args: any[]) {
      super();
      // todo: assign each argument to its matching property
      let built: Map<string, any> = new Map<string, any>();

      if (args.length === 1 && args[0] instanceof Map) {
        built = args[0];
      } else {
        Object.keys(this).forEach((key: string, index: number) => {
          const value = args[index];
          if (value) {
            built.set(key, value);
          }
        });
      }

      Object.assign(this, {...Object.fromEntries(built)});
    }
  }
}
