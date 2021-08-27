import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC, useState } from 'react';
import ReactPlayer from 'react-player';
import { CreateProjectTag } from '../../../../common/types';
import Button from '../../../../components/Button';
import ImageUpload from '../../../../components/ImageUpload';
import Input from '../../../../components/Input';
import { useLocalization } from '../../../../providers/localization';
import { CurrentPage, ProjectKeys } from '../../enums';
import Layout from '../Layout';
import classes from './styles.module.scss';

interface Props {
  changePage: (currentPage: CurrentPage) => void
  currentPage: CurrentPage,
  onChangeValue: (name: ProjectKeys, value: any) => void
  region: string,
  imageUrl?: string,
  videoUrl?: string,
  tags:CreateProjectTag[]
}

const Settings: FC<Props> = ({ changePage, currentPage, onChangeValue, region, imageUrl, videoUrl, tags }) => {
  const { t } = useLocalization();
  const handleBack = () => changePage(currentPage - 1);
  const handleNext = () => changePage(CurrentPage.END);
  const [tag, setTag] = useState('');
  const addTag = () => {
    if (tags.indexOf({ tag: { name: tag } }) === -1) {
      tags.push({ tag: { name: tag } });
      onChangeValue(ProjectKeys.PROJECT_TAGS, tags);
      setTag('');
    }
  };
  const deleteTag = (tagToDelete:string) => {
    const listTags = tags.filter(_tag => _tag.tag.name !== tagToDelete);
    onChangeValue(ProjectKeys.PROJECT_TAGS, listTags);
  };
  const [options, setOptions] = useState(
    [{ text: 'dsdfsdf', value: 'ddfdsfsd' }, { text: 'dsdfsdfdjshf', value: 'ddfdsfsdsdfsd' }]
  );
  const body = (
    <div>
      <Input
        type="text"
        label={t('Your location can be a key factor for the investor in your favor.')}
        onChange={e => onChangeValue(ProjectKeys.REGION, e.target.value)}
        value={region}
      />
      {imageUrl && <img src={imageUrl} alt="Project" className={classes.projectImage} />}
      <ImageUpload
        id="umloadProgectImage"
        label={t('Atach image')}
        onFileChange={file => onChangeValue(ProjectKeys.IMAGE_URL, file)}
      />
      {videoUrl && <ReactPlayer url={videoUrl} playing controls className={classes.projectImage} />}
      <ImageUpload
        id="umloadProgectVideo"
        label={t('Atach image')}
        onFileChange={file => onChangeValue(ProjectKeys.VIDEO_URL, file)}
      />
      <div className={classes.tagControl}>
        <Input
          type="text"
          label={t('Tags help when searching to give the user exactly those projects that interest him')}
          onChange={e => setTag(e.target.value)}
          value={tag}
          onBlur={() => setOptions([])}
          options={options}
          onFocus={() => setOptions(
            [{ text: 'dsdfsdf', value: 'ddfdsfsd' }, { text: 'dsdfsdfdjshf', value: 'ddfdsfsdsdfsd' }]
          )}
        />
        <Button onClick={addTag} className={classes.addTag}>{t('Add')}</Button>
      </div>
      <div className={classes.listTags}>{tags.map(_tag => (
        <Button
          className={classes.tag}
          key={_tag.tag.name}
          id={_tag.tag.name}
          onClick={() => deleteTag(_tag.tag.name)}
        >
          {`${_tag.tag.name}`}
          <FontAwesomeIcon icon={faTimes} />
        </Button>
      ))}
      </div>
    </div>
  );
  const footer = (
    <div className={classes.footer}>
      <Button onClick={handleBack} className={classes.back}>{t('Go back')}</Button>
      <Button onClick={handleNext}>{t('Create Project')}</Button>
    </div>
  );
  return (
    <Layout
      header={t('Finally')}
      setCurrentPage={changePage}
      body={body}
      footer={footer}
      currentPage={currentPage}
    />
  );
};

export default Settings;
