import {
  ProjectsFilter,
  ProjectsSort
} from 'hypecrafter-shared/enums';
import { ChangeEventHandler } from 'react';
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
}

const Filters = () => {
  const { t } = useLocalization();
  const { filterProjectsAction, sortProjectsAction } = useAction();
  const {
    sort: sortValue,
    filter: filterValue
  } = useTypedSelector((state) => state.projects.modificators);
  const { register, getValues } = useForm<FilterFormData>({
    defaultValues: { filter: filterValue, sort: sortValue },
  });

  const onChange: ChangeEventHandler<HTMLFormElement> = () => {
    const formState = getValues();

    if (sortValue !== formState.sort) {
      sortProjectsAction(formState.sort);
    }

    if (filterValue !== formState.filter) {
      filterProjectsAction(formState.filter);
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
      </Form>
      <Statistic />
    </Container>
  );
};

export default Filters;
