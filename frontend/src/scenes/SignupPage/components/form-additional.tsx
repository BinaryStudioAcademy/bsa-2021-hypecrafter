import { FunctionComponent } from 'react';
import { Form } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Pages } from '../../../common/enums/signupForms';
import { SignupData } from '../../../common/types/signup';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
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
  const { register, handleSubmit } = useForm<AdditionalFormData>();

  const onSubmit: SubmitHandler<AdditionalFormData> = (data) => {
    setCurrentPage(Pages.ADDITIONAL_FORM);
    onSignup({ ...mainFormInfo, ...data } as SignupData);
  };

  const handleBackButtonClick = () => {
    setCurrentPage(Pages.MAIN_FORM);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className={classes['select-form']}>
        <Form.Label>{t('Country')}</Form.Label>
        <Form.Select
          {...register('region', {
            required: false
          })}
        >
          <option value="">{t('Country (optional)')}</option>
          <option value="France">{t('France')}</option>
          <option value="Poland">{t('Poland')}</option>
          <option value="Switzerland">{t('Switzerland')}</option>
          <option value="UA">{t('Ukraine')}</option>
          <option value="GB">{t('United Kingdom')}</option>
        </Form.Select>
      </Form.Group>
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
      <Form.Group className={classes['select-form']}>
        <Form.Label>{t('Gender')}</Form.Label>
        <Form.Select
          {...register('gender', {
            required: false
          })}
        >
          <option value="">{t('Gender (optional)')}</option>
          <option value="male">{t('Male')}</option>
          <option value="female">{t('Female')}</option>
          <option value="other">{t('Other')}</option>
        </Form.Select>
      </Form.Group>
      <Form.Group className={classes['birth-form']}>
        <Form.Label>{t('Birthday')}</Form.Label>
        <br />
        <input
          className={classes['birth-input']}
          type="date"
          placeholder={t('Birthday')}
          {...register('birthday', {
            required: false
          })}
        />
      </Form.Group>
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