import { FunctionComponent } from 'react';
import { Form } from 'react-bootstrap';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Pages } from '../../../../common/enums/signupForms';
import { SignupData } from '../../../../common/types/signup';
import Button from '../../../../components/Button';
import DatePickerInput from '../../../../components/DatePicker';
import Input from '../../../../components/Input';
import Select from '../../../../components/Select';
import classes from '../styles.module.scss';
import { MainFormData } from './form-main';

type AdditionalFormData = {
  region?: string;
  phoneNumber?: string;
  gender?: string;
  birthday?: string;
};

interface AdditionalFormProps {
  setCurrentPage: React.Dispatch<React.SetStateAction<Pages>>;
  mainFormInfo: MainFormData;
  t: CallableFunction;
  onSignup: (data: SignupData) => void;
}

const AdditionalForm: FunctionComponent<AdditionalFormProps> = ({
  setCurrentPage,
  mainFormInfo,
  t,
  onSignup
}: AdditionalFormProps) => {
  const { control, register, handleSubmit } = useForm<AdditionalFormData>();

  const onSubmit: SubmitHandler<AdditionalFormData> = (data) => {
    setCurrentPage(Pages.ADDITIONAL_FORM);
    onSignup({ ...mainFormInfo, ...data } as SignupData);
  };

  const handleBackButtonClick = () => {
    setCurrentPage(Pages.MAIN_FORM);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className={classes['birth-form']}>
        <Form.Label>{t('Birthday')}</Form.Label>
        <br />
        <Controller
          control={control}
          name='birthday'
          render={({ field }) => (
            <DatePickerInput
              daySetter={(date) => field.onChange(date)}
            />
          )}
        />
      </Form.Group>
      <Select
        label={t('Country')}
        defaultText={t('Country (optional)')}
        className={classes['select-form']}
        options={[
          { value: 'FR', text: t('France') },
          { value: 'PL', text: t('Poland') },
          { value: 'UA', text: t('Ukraine') },
          { value: 'GB', text: t('United Kingdom') },
        ]}
        {...register('region', {
          required: false
        })}
      />
      <Input
        type="text"
        placeholder={t('Phone (optional)')}
        label={t('Phone')}
        {...register('phoneNumber', {
          required: false,
          pattern: {
            value: /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/,
            message: t('Phone number is invalid')
          }
        })}
      />
      <Select
        label={t('Gender')}
        defaultText={t('Gender (optional)')}
        className={classes['select-form']}
        options={[
          { value: 'male', text: t('Male') },
          { value: 'female', text: t('Female') },
          { value: 'other', text: t('Other') }
        ]}
        {...register('gender', {
          required: false
        })}
      />
      <div className={classes['detail-form-control']}>
        <Button
          className={classes['sign-up-button']}
          type="button"
          onClick={handleBackButtonClick}
        >
          {t('Back')}
        </Button>
        <Button className={classes['sign-up-button']} type="submit">
          {t('Submit')}
        </Button>
      </div>
    </form>
  );
};

export default AdditionalForm;
