import { CreateProject, SearchResult } from '../common/types';
import { env } from '../env';
import { api } from '../helpers/http';

interface SearchProps { query: string; }

export const search = (
  params: SearchProps
): Promise<SearchResult> => api.post({
  url: env.search.url || 'https://hypecrafter.ent.us-central1.gcp.cloud.es.io/api/as/v1/engines/hypecrafter/search',
  params: { ...params, headers: { Authorization: `Bearer ${env.search.searchKey}` } },
  config: { isExternal: true }
});

export const addIndex = (
  params: CreateProject
): Promise<SearchResult> => {
  const body = JSON.parse(JSON.stringify(params));
  const result = Object.keys(body)
    .reduce((prev, current) => ({ ...prev, [current.toLowerCase()]: body[current] }), {});
  return api.post({
    url: env.search.urlDocuments
      || 'https://hypecrafter.ent.us-central1.gcp.cloud.es.io/api/as/v1/engines/hypecrafter/documents',
    params: { ...result, headers: { Authorization: `Bearer ${env.search.privateKey}` } },
    config: { isExternal: true }
  });
};

