export interface RequestArgs {
  url: string;
  params?: Record<string, string>;
  config?: { isExternal: boolean };
}
