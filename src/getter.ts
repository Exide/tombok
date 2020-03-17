import { capitalize } from './utils';

/**
 * This decorator can be used on any class property to make tombok build a Java-like getter.
 * 
 * Example:
 * ```typescript
 *   ＠getter
 *   private foo: number;
 * ```
 * 
 * will generate:
 * 
 * ```typescript
 *     public getFoo(): number {
 *         return this.foo;
 *     }
 * ```
 *
 * @param {any} target Base class where we are going to mutate its method
 * @param {string} key Name of the method that was decorated
 */
export function getter(target: any, key: string): void {
  const capitalizedKey: string = capitalize(key);
  const methodName: string = `get${capitalizedKey}`;
  target[methodName] = function() {
    const obj: any = this;
    return obj[key];
  };
}
