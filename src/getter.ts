import { capitalize } from './utils';

// export default function getter(target: any, propertyKey: string) {
//   const capitalizedPropertyName = capitalize(propertyKey);
//   const methodName = `get${capitalizedPropertyName}`;
//   target[methodName] = function() { return this[propertyKey] };
// }

export default function getter(target: any, key: string): void {
  const internal: string = `_${key}`;
  target[internal] = target[key];
  delete target[key];

  const getter = (): typeof key => target[internal];
  const setter = (value: typeof key): void => { target[internal] = value };

  Object.defineProperty(target, key, {
    get: getter,
    set: setter
  });
}
