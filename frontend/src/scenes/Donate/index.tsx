import { ChangeEvent, FC, FormEvent, useState } from 'react';
import { Container } from 'react-bootstrap';
import Button from '../../components/Button';
import Input from '../../components/Input';
import SelectedFund from '../../components/SelectedFund';
import classes from './styles.module.scss';

const Donate: FC = () => {
  const [price, setPrice] = useState('5');
  const [selectedPrice, setSelectedPrice] = useState(5);
  // const { t } = useLocalization();
  return (
    <Container className={classes['donate-page']}>
      <div className={classes['donate-price']}>
        <SelectedFund type="donate" amount={selectedPrice} />
        <form
          className={classes['donate-form']}
          onSubmit={(event: FormEvent) => {
            setSelectedPrice(Number(price));
            event.preventDefault();
          }}
        >
          <div className={classes['donate-input-wrp']}>
            <Input
              className={classes['donate-input']}
              type='number'
              step={1}
              value={price}
              min={1}
              max={10000}
              onInput={(event: ChangeEvent<HTMLInputElement>) => { setPrice(event.target.value); }}
            />
          </div>
          <Button type="submit" className={classes['donate-submit-btn-price']}>
            Ok
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default Donate;
