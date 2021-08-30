import {
  ProjectsCategories,
  ProjectsFilter,
  ProjectsSort
} from 'hypecrafter-shared/enums';
import { useEffect } from 'react';
import { Container, Form } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import MultiSelect from '../../../../components/MultiSelect';
import Select from '../../../../components/Select';
import { useAction, useAuth, useTypedSelector } from '../../../../hooks';
import { useLocalization } from '../../../../providers/localization';
import Statistic from '../Statistic';
import classes from './styles.module.scss';

interface CategoriesType {
  value: ProjectsCategories;
  label: string;
}

interface FilterFormData {
  sort: ProjectsSort;
  filter: ProjectsFilter;
  categories: CategoriesType[];
}

const Filters = () => {
  const { id: userId } = useAuth();
  const { t } = useLocalization();
  const {
    filterCategoriesProjectsAction,
    filterProjectsAction,
    sortProjectsAction,
  } = useAction();
  const {
    sort: sortValue,
    filter: filterValue,
  } = useTypedSelector((state) => state.projects.modificators);
  const { register, getValues, setValue, control } = useForm<FilterFormData>({
    defaultValues: {
      filter: filterValue,
      sort: sortValue,
      categories: [],
    },
  });

  useEffect(() => {
    setValue('sort', sortValue);
    setValue('filter', filterValue);
  }, [sortValue, filterValue]);

  const onChange = () => {
    const formState = getValues();

    console.log(formState);

    if (sortValue !== formState.sort) {
      sortProjectsAction(formState.sort);
    }

    if (filterValue !== formState.filter) {
      filterProjectsAction(formState.filter);
    }

    filterCategoriesProjectsAction(formState.categories.map(category => category.value));
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

        {!!userId && (
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
        )}

        <Controller
          name="categories"
          rules={{ required: true }}
          control={control}
          render={({ field }) => (
            <MultiSelect
              {...field}
              label={t('Categories')}
              placeholder={t('All categories')}
              noOptionsMessage={() => t('No options')}
              onChange={(value: CategoriesType[]) => {
                field.onChange(value);
                onChange();
              }}
              options={[
                { value: ProjectsCategories.Art, label: t('Art') },
                { value: ProjectsCategories.Comics, label: t('Comics') },
                { value: ProjectsCategories.Crafts, label: t('Crafts') },
                { value: ProjectsCategories.Dance, label: t('Dance') },
                { value: ProjectsCategories.Design, label: t('Design') },
                { value: ProjectsCategories.Fashion, label: t('Fashion') },
                { value: ProjectsCategories.FilmAndVideo, label: t('Film and Video') },
                { value: ProjectsCategories.Food, label: t('Food') },
                { value: ProjectsCategories.Games, label: t('Games') },
                { value: ProjectsCategories.Journalism, label: t('Journalism') },
                { value: ProjectsCategories.Music, label: t('Music') },
                { value: ProjectsCategories.Photography, label: t('Photography') },
                { value: ProjectsCategories.Publishing, label: t('Publishing') },
                { value: ProjectsCategories.Technology, label: t('Technology') },
                { value: ProjectsCategories.Theater, label: t('Theater') },
              ]}
            />
          )}
        />
      </Form>
      <Statistic />
    </Container>
  );
};

export default Filters;
