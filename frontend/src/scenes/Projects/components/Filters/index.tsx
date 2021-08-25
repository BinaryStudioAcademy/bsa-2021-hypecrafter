import {
  ProjectsCategories,
  ProjectsFilter,
  ProjectsSort
} from 'hypecrafter-shared/enums';
import { ChangeEventHandler, useEffect } from 'react';
import { Container, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import Select from '../../../../components/Select';
import { useAction, useTypedSelector } from '../../../../hooks';
import { useLocalization } from '../../../../providers/localization';
import Statistic from '../Statistic';
import classes from './styles.module.scss';

interface FilterFormData {
  sort: ProjectsSort;
  filter: ProjectsFilter;
  category: ProjectsCategories;
}

const Filters = () => {
  const { t } = useLocalization();
  const { filterCategoryProjectsAction, filterProjectsAction, sortProjectsAction } = useAction();
  const {
    sort: sortValue,
    filter: filterValue,
    category: categoryValue,
  } = useTypedSelector((state) => state.projects.modificators);
  const { register, getValues, setValue } = useForm<FilterFormData>({
    defaultValues: {
      filter: filterValue,
      sort: sortValue,
      category: categoryValue,
    },
  });

  useEffect(() => {
    setValue('sort', sortValue);
    setValue('filter', filterValue);
  }, [sortValue, filterValue]);

  const onChange: ChangeEventHandler<HTMLFormElement> = () => {
    const formState = getValues();

    if (sortValue !== formState.sort) {
      sortProjectsAction(formState.sort);
    }

    if (filterValue !== formState.filter) {
      filterProjectsAction(formState.filter);
    }

    if (categoryValue !== formState.category) {
      filterCategoryProjectsAction(formState.category);
    }
  };

  return (
    <Container className={classes.filters}>
      <Form onChange={onChange}>
        <Select
          label={t('Sort by')}
          options={[
            { value: ProjectsSort.NAME, text: t('Name') },
            { value: ProjectsSort.DATE, text: t('Date') },
            { value: ProjectsSort.POPULAR, text: t('Popular') },
            { value: ProjectsSort.RECOMMENDED, text: t('Recommended') },
          ]}
          {...register('sort', { required: true })}
        />
        <Select
          label={t('Filter by')}
          options={[
            { value: ProjectsFilter.ALL, text: t('All') },
            { value: ProjectsFilter.FAVORITE, text: t('Favorite') },
            { value: ProjectsFilter.INVESTED, text: t('Invested') },
            { value: ProjectsFilter.OWN, text: t('Own') },
          ]}
          {...register('filter', { required: true })}
        />
        <Select
          label={t('Category')}
          options={[
            { value: ProjectsCategories.ALL, text: t('All') },
            { value: ProjectsCategories.Art, text: t('Art') },
            { value: ProjectsCategories.Comics, text: t('Comics') },
            { value: ProjectsCategories.Crafts, text: t('Crafts') },
            { value: ProjectsCategories.Dance, text: t('Dance') },
            { value: ProjectsCategories.Design, text: t('Design') },
            { value: ProjectsCategories.Fashion, text: t('Fashion') },
            { value: ProjectsCategories.FilmAndVideo, text: t('Film and Video'), },
            { value: ProjectsCategories.Food, text: t('Food') },
            { value: ProjectsCategories.Games, text: t('Games') },
            { value: ProjectsCategories.Journalism, text: t('Journalism') },
            { value: ProjectsCategories.Music, text: t('Music') },
            { value: ProjectsCategories.Photography, text: t('Photography') },
            { value: ProjectsCategories.Publishing, text: t('Publishing') },
            { value: ProjectsCategories.Technology, text: t('Technology') },
            { value: ProjectsCategories.Theater, text: t('Theater') },
          ]}
          {...register('category', { required: true })}
        />
      </Form>
      <Statistic />
    </Container>
  );
};

export default Filters;
