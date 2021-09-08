import { parse } from 'query-string';
import { useLocation } from 'react-router-dom';

export function useQuery() {
  return parse(useLocation().search, { arrayFormat: 'comma' });
}
