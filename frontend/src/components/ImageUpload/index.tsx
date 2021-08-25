import { FC } from 'react';
import S3FileUpload from 'react-s3';
import Button from '../Button';

interface Prors{
  onFileChange: (file: string) => void,
  id: string,
  label:string
}
const config = {
  bucketName: 'hypecrafter',
  region: 'eu-west-2',
  accessKeyId: 'AKIA2MWJ7PBCMN3574WG',
  secretAccessKey: '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'
};
const ImageUpload:FC<Prors> = ({ onFileChange, id, label }) => {
  const imageHandler = (files: any) => {
    const file = files[0];
    S3FileUpload.uploadFile(file, config)
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
