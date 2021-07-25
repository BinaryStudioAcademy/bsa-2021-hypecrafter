export interface Action<T = string, P = never> {
  type: T,
  payload: P
}
