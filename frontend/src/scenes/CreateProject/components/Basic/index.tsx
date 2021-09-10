import { FC, useEffect } from 'react';
import Button from '../../../../components/Button';
import Input from '../../../../components/Input';
import LoaderWrapper from '../../../../components/LoaderWrapper';
import Select from '../../../../components/Select';
import { useAction, useTypedSelector } from '../../../../hooks';
import { useLocalization } from '../../../../providers/localization';
import { CurrentPage, ProjectKeys } from '../../enums';
import Layout from '../Layout';
import classes from './styles.module.scss';

interface Props {
  changePage: (currentPage: CurrentPage) => void
  currentPage: CurrentPage,
  onChangeValue: (name: ProjectKeys, value: string) => void
  name: string,
  description: string,
  category:string
}

const Basic: FC<Props> = ({ changePage, currentPage, onChangeValue, name, description, category }) => {
  const { t } = useLocalization();
  const handleBack = () => changePage(currentPage - 1);
  const handleNext = () => changePage(currentPage + 1);
  const store = useTypedSelector(({ categories: { categories, isLoading } }) => ({
    categories,
    isLoading
  }));
  const { categories, isLoading } = store;
  const { getCategoriesAction } = useAction();
  useEffect(() => {
    getCategoriesAction();
  }, [getCategoriesAction]);
  const body = (
    <div>
      <Input
        type="text"
        label={t('Write a clear, brief title that helps people quickly understand the gist of your project.')}
        onChange={e => onChangeValue(ProjectKeys.NAME, e.target.value)}
        value={name}
        isRequired
      />
      <Select
        options={categories.map(cat => ({ text: cat.name, value: cat.id }))}
        label={t('Pick a project category to connect with a specific community.')}
        defaultText={category || '-'}
        onChange={e => onChangeValue(ProjectKeys.CATEGORY, e.target.value)}
        defaultValue={category}
        isRequired
      />
      <Input
        type="textarea"
        label={t('Describe what you’ll be creating.')}
        onChange={e => onChangeValue(ProjectKeys.DESCRIPTION, e.target.value)}
        value={description}
        isRequired
      />
    </div>
  );
  const footer = (
    <div className={classes.footer}>
      <Button onClick={handleBack} className={classes.back}>{t('Go back')}</Button>
      <Button onClick={handleNext}>{t('Continue')}</Button>
    </div>
  );
  return (
    <LoaderWrapper isLoading={isLoading}>
      <Layout
        header={t('First, let’s get you set up.')}
        setCurrentPage={changePage}
        body={body}
        footer={footer}
        currentPage={currentPage}
      />
    </LoaderWrapper>
  );
};

export default Basic;
