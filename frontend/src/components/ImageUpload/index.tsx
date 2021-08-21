import { FC } from 'react';
import Button from '../Button';

interface Prors{
  onFileChange: (file: string) => void,
  id: string,
  label:string
}

const ImageUpload:FC<Prors> = ({ onFileChange, id, label }) => {
  const imageHandler = (files: any) => {
    const file = files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => { if (reader.result) onFileChange(reader.result.toString()); };
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
