import { ChangeEventHandler } from 'react';
import { Container, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import Select from '../../../../components/Select';
import { useAction } from '../../../../hooks';
import { useLocalization } from '../../../../providers/localization';
import { FilterValues, SortValues } from '../../common/enums';
import { FilterFormData } from '../../common/types';
import Statistic from '../Statistic';
import classes from './styles.module.scss';

const Filters = () => {
  const { t } = useLocalization();
  const {
    filterProjectsAction,
    sortProjectsAction
  } = useAction();
  const { register, getValues } = useForm<FilterFormData>({
    defaultValues: { filter: FilterValues.ALL, sort: SortValues.NAME },
  });

  const onChange: ChangeEventHandler<HTMLFormElement> = () => {
    const formState = getValues();
    sortProjectsAction(formState.sort);
    filterProjectsAction(formState.filter);
  };

  return (
    <Container className={classes.filters}>
      <Form onChange={onChange}>
        <Select
          label={t('Sort by')}
          options={[
            { value: SortValues.NAME, text: t('Name') },
            { value: SortValues.DATE, text: t('Date') },
          ]}
          {...register('sort', { required: true })}
        />
        <Select
          label={t('Filter by')}
          options={[
            { value: FilterValues.ALL, text: t('All') },
            { value: FilterValues.FAVORITE, text: t('Favorite') },
            { value: FilterValues.INVESTED, text: t('Invested') },
            { value: FilterValues.OWN, text: t('Own') },
          ]}
          {...register('filter', { required: true })}
        />
      </Form>
      <Statistic />
    </Container>
  );
};

export default Filters;
