import { Container } from 'react-bootstrap';
import Users from '../../scenes/Users';
import BootstrapExample from '../BootstrapExample';
import TranslateExample from '../TranslateExample';
import ButtonExample from '../ButtonExample';
import InputExample from '../InputExample';
import Chart from '../Chart/Chart';
import { blueColors, setBorderColorGradient } from '../Chart/helpers';

function Main() {
  return (
    <Container>
      <Chart
        type="line"
        dataSets={[
          {
            label: '01',
            data: [12, 19, 3, 5, 2, 3],
            fill: false,
            backgroundColor: 'yellow',
            borderColor: setBorderColorGradient(['red', 'orange'])
          },
          {
            label: '02',
            data: [12, 11, 10, 15, 16, 3],
            fill: false,
            backgroundColor: 'rgb(23, 229, 232)',
            borderColor: setBorderColorGradient(blueColors)
          }
        ]}
        labels={['1', '2', '3', '4', '5', '6']}
      />
      <Users />
      <TranslateExample />
      <BootstrapExample />
      <ButtonExample />
      <InputExample />
    </Container>
  );
}

export default Main;
