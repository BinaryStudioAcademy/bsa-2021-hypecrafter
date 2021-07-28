export interface RequestArgs {
  url: string;
  params?: Record<string, string>;
  config?: { external: boolean };
}
