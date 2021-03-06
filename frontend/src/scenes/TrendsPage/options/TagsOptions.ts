import { ActiveElement, ChartEvent, Tick } from 'chart.js';
import { TagNameMaxLength } from '../../../common/constans';
import { ChartType } from '../../../components/Chart';
import {
  blueColorsReverse,
  setBorderColorGradient
} from '../../../components/Chart/helpers';
import { getSortedArray, сutWord } from '../../../helpers';
import { TagWithQuantity } from '../interfaces';

const getDefaultOptions = (data: TagWithQuantity[], t: CallableFunction) => ({
  responsive: true,
  maintainAspectRatio: false,
  onClick: (event: ChartEvent, elements: ActiveElement[]) => {
    if (elements.length > 0) {
      // TODO ... go to the projects page
      console.log(data[elements[0].index]);
    }
  },
  plugins: {
    legend: {
      display: false
    }
  },
  scales: {
    x: {
      grid: {
        display: false
      },
      ticks: {
        color: 'white',
        callback: (value: string | number, index: number, _ticks: Tick[]) => сutWord(data[index].name, TagNameMaxLength)
      }
    },
    y: {
      grid: {
        drawBorder: false,
        borderDash: [8],
        color: 'rgba(10,236,236, 0.15)'
      },
      ticks: {
        color: 'grey',
        callback: (value: string | number, _index: number, _ticks: Tick[]) => `${value} ${t('projects')}`,
        stepSize: 1
      }
    }
  }
});

const getDefaultData = (data: TagWithQuantity[], t: CallableFunction) => {
  getSortedArray(data, 'quantity');
  return {
    labels: data.map((item) => item.name),
    datasets: [
      {
        label: t('projects'),
        data: data.map((item) => item.quantity),
        fill: false,
        backgroundColor: setBorderColorGradient(blueColorsReverse),
        barThickness: 13
      }
    ]
  };
};

const type: ChartType = 'bar';

const defaultProps = (items: TagWithQuantity[], t: CallableFunction) => {
  const data = getDefaultData(items, t);
  const options = getDefaultOptions(items, t);

  return {
    type,
    labels: data.labels,
    dataSets: data.datasets,
    options
  };
};

export default defaultProps;
