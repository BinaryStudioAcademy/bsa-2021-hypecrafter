import { Tick } from 'chart.js';
import { ChartType } from '../../../../components/Chart';
import {
  blueColorsReverse,
  setBorderColorGradient
} from '../../../../components/Chart/helpers';

const getDefaultOptions = (t: CallableFunction) => ({
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
        color: 'white',
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
        stepSize: 10
      }
    }
  }
});

const getDefaultData = (data: any[], t: CallableFunction) => ({
  labels: data.map((item) => item.date),
  datasets: [
    {
      label: t('projects'),
      data: data.map((item) => item.data),
      fill: false,
      borderColor: setBorderColorGradient(blueColorsReverse),
      backgroundColor: setBorderColorGradient(blueColorsReverse),
      barThickness: 13
    }
  ]
});

const type: ChartType = 'line';

const defaultParams = (items: any[], t: CallableFunction) => {
  const data = getDefaultData(items, t);
  const options = getDefaultOptions(t);

  return {
    type,
    labels: data.labels,
    dataSets: data.datasets,
    options
  };
};

export default defaultParams;
