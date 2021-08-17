import { HttpMethod } from '../common/enums';
import { getEnv } from '../helpers';
import load from './http';

const upload = async (file: any) => {
  console.log(file.buffer);
  const { data } = await load(getEnv('IMGUR_UPLOAD_API_URL') || 'https://api.imgur.com/3/image', {
    method: HttpMethod.POST,
    data: {
      image: file
    },
    headers: { Authorization: `Client-ID ${getEnv('IMGUR_ID') || 'b328cb99e6a9ac2'}` }
  });

  return {
    link: data.link,
    deleteHash: data.deletehash
  };
};

export default upload;
