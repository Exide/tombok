type Constructor<T> = new (...args: any[]) => T;

export default function <T extends Constructor<{}>>(Base: T) {
  // todo: get property key, type, and value if available from Base
  return class extends Base {
    // todo: set constructor arguments to typed arguments matching Base properties, in the same order declared
    constructor(...args: any[]) {
      super();
      // todo: assign each argument to its matching property
    }
  }
}
