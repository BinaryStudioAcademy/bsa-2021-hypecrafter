import { FC } from 'react';
import S3FileUpload from 'react-s3';
import { env } from '../../env';
import Button from '../Button';

interface Prors{
  onFileChange: (file: string) => void,
  id: string,
  label:string
}
const ImageUpload:FC<Prors> = ({ onFileChange, id, label }) => {
  const imageHandler = (files: any) => {
    const file = files[0];
    S3FileUpload.uploadFile(file, env.aws)
      .then((data:any) => { onFileChange(data.location); })
      .catch((err:any) => console.log(err));
  };
  return (
    <Button>
      <input
        type="file"
        name="image"
        accept="image/*"
        hidden
        multiple={false}
        onChange={e => imageHandler(e.target.files)}
        id={id}
      />
      <label htmlFor={id}>{label}</label>
    </Button>
  );
};
export default ImageUpload;
