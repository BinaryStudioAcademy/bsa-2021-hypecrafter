import axios from 'axios';
import { HttpMethod } from '../common/enums';

const instance = axios.create({
  timeout: 5000
});
const getData = (response:any) => response.data;

const catchError = (err:any) => {
  const { response } = err;
  const { data } = response;

  throw new Error(data.data.error);
};
const load = (url:string, options:any) => {
  const { method = HttpMethod.GET, data, headers } = options;

  return instance
    .request({
      url,
      method,
      headers,
      data
    })
    .then(getData)
    .catch(catchError);
};
export default load;
