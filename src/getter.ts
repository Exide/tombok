import { capitalize } from './utils';

export function getter(target: any, key: string): void {
  const capitalizedKey: string = capitalize(key);
  const methodName: string = `get${capitalizedKey}`;
  target[methodName] = function() {
    const obj: any = this;
    return obj[key];
  };
}
