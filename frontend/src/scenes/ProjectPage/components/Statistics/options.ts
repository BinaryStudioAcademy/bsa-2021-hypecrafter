import { Tick } from 'chart.js';
import { ChartType } from '../../../../components/Chart';
import {
  blueColorsReverse,
  setBorderColorGradient
} from '../../../../components/Chart/helpers';
import { DonationItem } from '../../interfaces';

function getMaxOfArray(numArray: number[]) {
  return Math.max.apply(null, numArray);
}

const getDefaultOptions = (data: DonationItem[], t: CallableFunction) => ({
  responsive: true,
  maintainAspectRatio: false,
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
        color: 'white'
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
        callback: (value: string | number, _index: number, _ticks: Tick[]) => `${value} ${t('money')}`,
        stepSize: Math.round(getMaxOfArray(data.map(el => el.donated)) / 7)
      }
    }
  }
});

const getDefaultData = (data: DonationItem[], t: CallableFunction) => ({
  labels: data.map((item) => {
    const date = new Date(item.donationCreatedAt);
    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
  }),
  datasets: [
    {
      label: t('projects'),
      data: data.map((item) => item.donated),
      fill: false,
      borderColor: setBorderColorGradient(blueColorsReverse),
      backgroundColor: setBorderColorGradient(blueColorsReverse),
      barThickness: 13
    }
  ]
});

const type: ChartType = 'line';

const defaultParams = (items: DonationItem[], t: CallableFunction) => {
  const data = getDefaultData(items, t);
  const options = getDefaultOptions(items, t);

  return {
    type,
    labels: data.labels,
    dataSets: data.datasets,
    options
  };
};

export default defaultParams;
