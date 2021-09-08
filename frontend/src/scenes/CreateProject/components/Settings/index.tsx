import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC, useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { CreateProjectTag } from '../../../../common/types';
import Button from '../../../../components/Button';
import ImageUpload from '../../../../components/ImageUpload';
import Input from '../../../../components/Input';
import LoaderWrapper from '../../../../components/LoaderWrapper';
import { useAction, useTypedSelector } from '../../../../hooks';
import { useLocalization } from '../../../../providers/localization';
import { CurrentPage, ProjectKeys } from '../../enums';
import Layout from '../Layout';
import classes from './styles.module.scss';

interface Props {
  currentPage: CurrentPage,
  region: string,
  imageUrl?: string,
  videoUrl?: string,
  instagramUrl?: string,
  facebookUrl?: string,
  dribbleUrl?: string,
  pinterestUrl?: string,
  behanceUrl?: string,
  newTags: CreateProjectTag[],
  changePage: (currentPage: CurrentPage) => void,
  onChangeValue: (name: ProjectKeys, value: string | CreateProjectTag[]) => void,
}

const Settings: FC<Props> = ({
  currentPage,
  region,
  imageUrl,
  videoUrl,
  newTags,
  instagramUrl,
  facebookUrl,
  dribbleUrl,
  pinterestUrl,
  behanceUrl,
  changePage,
  onChangeValue }) => {
  const [tag, setTag] = useState('');
  const [options, setOptions] = useState<Array<{ text: string, value: string }>>([]);
  const { getTagsAction } = useAction();
  useEffect(() => {
    getTagsAction();
  }, [getTagsAction]);
  const store = useTypedSelector(({ tags: { tags, isLoading } }) => ({
    tags,
    isLoading
  }));
  const { tags, isLoading } = store;
  const { t } = useLocalization();

  const handleBack = () => changePage(currentPage - 1);
  const handleNext = () => changePage(CurrentPage.END);
  const addTag = () => {
    if (!newTags.find(newTag => newTag.tag.name === tag)) {
      onChangeValue(ProjectKeys.PROJECT_TAGS, [...newTags, { tag: { name: tag } }]);
      setTag('');
    }
  };
  const deleteTag = (tagToDelete: string) => {
    const listTags = newTags.filter(_tag => _tag.tag.name !== tagToDelete);
    onChangeValue(ProjectKeys.PROJECT_TAGS, listTags);
  };
  const createListTags = () => {
    const filteredTags = tags.filter(existTag => existTag.name.indexOf(tag) !== -1);
    return filteredTags.map(existTag => ({ text: existTag.name, value: existTag.id }));
  };
  const tagChanged = (value: string) => {
    setTag(value);
    setOptions(createListTags());
  };
  const addExistTag = (idTag: string) => {
    setOptions([]);
    const selectedTag = tags.find(existTag => existTag.id === idTag);
    if (selectedTag && newTags.indexOf({ tag: { name: selectedTag.name } }) === -1) {
      newTags.push({ tag: selectedTag });
      onChangeValue(ProjectKeys.PROJECT_TAGS, newTags);
    }
  };
  const body = (
    <div>
      <Input
        type="text"
        label={t('Your location can be a key factor for the investor in your favor.')}
        onChange={e => onChangeValue(ProjectKeys.REGION, e.target.value)}
        value={region}
      />
      <Input
        type="text"
        label={t('Instagram link')}
        onChange={e => onChangeValue(ProjectKeys.INSTAGRAM, e.target.value)}
        value={instagramUrl}
      />
      <Input
        type="text"
        label={t('Facebook link')}
        onChange={e => onChangeValue(ProjectKeys.FACEBOOK, e.target.value)}
        value={facebookUrl}
      />
      <Input
        type="text"
        label={t('Drible link')}
        onChange={e => onChangeValue(ProjectKeys.DRIBBLE, e.target.value)}
        value={dribbleUrl}
      />
      <Input
        type="text"
        label={t('Pinterest link')}
        onChange={e => onChangeValue(ProjectKeys.PINTEREST, e.target.value)}
        value={pinterestUrl}
      />
      <Input
        type="text"
        label={t('Behance link')}
        onChange={e => onChangeValue(ProjectKeys.BEHANCE, e.target.value)}
        value={behanceUrl}
      />
      {imageUrl && <img src={imageUrl} alt="Project" className={classes.projectImage} />}
      <ImageUpload
        id="umloadProgectImage"
        accept='image/*'
        label={t('Atach image')}
        onFileChange={file => onChangeValue(ProjectKeys.IMAGE_URL, file)}
      />
      {videoUrl && <ReactPlayer url={videoUrl} playing controls className={classes.projectVideo} />}
      <ImageUpload
        className={classes.addVideo}
        accept='video/*'
        id="umloadProgectVideo"
        label={t('Atach video')}
        onFileChange={file => onChangeValue(ProjectKeys.VIDEO_URL, file)}
      />
      <div className={classes.tagControl}>
        <Input
          type="text"
          label={t('Tags help when searching to give the user exactly those projects that interest him')}
          onChange={e => tagChanged(e.target.value)}
          value={tag}
          options={options}
          onFocus={() => setOptions(createListTags())}
          selectOption={addExistTag}
        />
        <Button onClick={addTag} className={classes.addTag}>{t('Add')}</Button>
      </div>
      <div className={classes.listTags}>{newTags.map(projectTag => (
        <Button
          className={classes.tag}
          key={projectTag.tag.name}
          id={projectTag.tag.name}
          onClick={() => deleteTag(projectTag.tag.name)}
        >
          {projectTag.tag.name}
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
    <LoaderWrapper isLoading={isLoading}>
      <Layout
        header={t('Finally')}
        setCurrentPage={changePage}
        body={body}
        footer={footer}
        currentPage={currentPage}
      />
    </LoaderWrapper>
  );
};

export default Settings;
