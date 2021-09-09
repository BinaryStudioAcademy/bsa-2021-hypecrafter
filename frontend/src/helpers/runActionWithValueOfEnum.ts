import { getEnumKeyByEnumValue } from '.';

export function runActionWithEnumValue<E extends { [index: string]: string }>(
  param: string | null,
  enumName: E,
  actionCallback: (enumValue: E[keyof E]) => void
): void {
  if (param) {
    const value = getEnumKeyByEnumValue(enumName, param);
    if (value) {
      actionCallback(enumName[value]);
    }
  }
}

export function runActionWithArrayOfEnumValues<E extends { [index: string]: string }>(
  param: string | string[] | null,
  enumName: E,
  actionCallback: (enumValue: E[keyof E][]) => void
): void {
  if (param) {
    const paramsArray = Array.isArray(param) ? [...param] : [param];

    const params = paramsArray.reduce<E[keyof E][]>((acc, item) => {
      const value = getEnumKeyByEnumValue(enumName, item);
      if (value) {
        return [...acc, enumName[value]];
      }
      return [...acc];
    }, []);

    actionCallback(params);
  }
}
