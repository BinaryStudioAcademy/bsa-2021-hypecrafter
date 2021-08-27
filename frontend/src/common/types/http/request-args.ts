export interface RequestArgs {
  url: string;
  params?: Record<string, any>;
  config?: { isExternal: boolean };
}
