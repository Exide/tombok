import { capitalize } from './utils';

export default function getter(target: any, key: string) {
  const capitalizedKey = capitalize(key);
  const methodName = `get${capitalizedKey}`;
  Object.defineProperty(target, methodName, { value: () => target[key] });
}
