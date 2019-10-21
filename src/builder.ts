type Constructor<T> = new (...args: any[]) => T;

export default function <T extends Constructor<{}>>(Base: T) {
  return class extends Base {
    public static builder() { return new Builder<T>(Base); };
  }
}

class Builder<T> {

  private readonly original: any;

  constructor(original: any) {
    this.original = original;
    // todo: create an instance property for each original property
    // todo: set instance property value to original value if it exists (default)
    // todo: create a method for each instance property
  }

  build(): T {
    // todo: build an original, passing in the current instance properties
    return new this.original();
  }

}
