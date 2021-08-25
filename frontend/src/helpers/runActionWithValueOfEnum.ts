import { getEnumKeyByEnumValue } from '.';

export function runActionWithValueOfEnum<E extends { [index: string]: string }>(
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
