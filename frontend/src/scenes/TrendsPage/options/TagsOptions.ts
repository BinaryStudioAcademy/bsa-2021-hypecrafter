import { ChartEvent, ActiveElement } from 'chart.js';
import { ChartType } from '../../../components/Chart/Chart';
import {
  setBorderColorGradient,
  blueColorsReverse
} from '../../../components/Chart/helpers';
import { TagItem } from '../interfaces';

const getSortedArray = (array: TagItem[]) => {
  array.sort((a, b) => (a.quantity > b.quantity ? -1 : 1));
};

const getDefaultOptions = (data: TagItem[]) => ({
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
        color: 'grey'
      }
    }
  }
});

const getDefaultData = (data: TagItem[]) => {
  getSortedArray(data);
  return {
    labels: data.map((item) => item.name),
    datasets: [
      {
        label: 'Tags',
        data: data.map((item) => item.quantity),
        fill: false,
        backgroundColor: setBorderColorGradient(blueColorsReverse),
        barThickness: 13
      }
    ]
  };
};

const type: ChartType = 'bar';

const defaultProps = (items: TagItem[]) => {
  const data = getDefaultData(items);
  const options = getDefaultOptions(items);

  return {
    type,
    labels: data.labels,
    dataSets: data.datasets,
    options
  };
};

export default defaultProps;
