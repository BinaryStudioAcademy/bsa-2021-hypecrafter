import { SearchResult } from '../common/types';
import { env } from '../env';
import { api } from '../helpers/http';

interface SearchProps { query: string; }
const countResult = 5;
const startResultPage = 1;
export const search = (
  params: SearchProps
): Promise<SearchResult[]> => api.post({
  url: env.search.url || 'https://hypecrafter.ent.us-central1.gcp.cloud.es.io/api/as/v1/engines/hypecrafter/search',
  params: {
    ...params,
    page: { size: countResult, current: startResultPage },
    headers: { Authorization: `Bearer ${env.search.searchKey}` }
  },
  config: { isExternal: true }
}).then(result => {
  const { results } = JSON.parse(JSON.stringify(result));
  const searchResult = results.map((r:any) => Object.keys(r)
    .reduce((prev, current) => ({ ...prev, [current]: r[current].raw }), {}));
  return searchResult;
});

