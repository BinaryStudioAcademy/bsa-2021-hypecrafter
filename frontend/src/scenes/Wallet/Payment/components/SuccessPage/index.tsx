import ConfettiExplosion from '@reonomy/react-confetti-explosion';
import { FC } from 'react';
import { Button } from 'react-bootstrap';
import { useTypedSelector } from '../../../../../hooks';
import SelectedFund from '../SelectedFund';
import classes from './styles.module.scss';

const SuccessPage: FC = () => {
  const { isCustom, amount } = useTypedSelector(
    (
      { payment }
    ) => payment
  );

  return (
    <div className={classes['root-payment-success']}>
      <div className={classes.confetti}>
        <ConfettiExplosion particleCount={25} />
        <ConfettiExplosion particleCount={25} />
      </div>
      <h1><span className={classes['payment-success-title']}>Congratulation!</span></h1>
      <h2 className={classes['payment-success-about']}>
        <span>Payment transaction was successful</span>
      </h2>
      <SelectedFund isCustom={isCustom} amount={amount} />
      <Button className={classes['btn-return-success-payment']}>Return to Main Page</Button>
    </div>
  );
};

export default SuccessPage;
