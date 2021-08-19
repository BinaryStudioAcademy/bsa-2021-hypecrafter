/* eslint-disable */
import { ChartType } from '../../../components/Chart';
import { randomBrightColor } from '../../../helpers';
import { ProjectItem } from '../interfaces';

type ChartPosition =
  | 'center'
  | 'left'
  | 'top'
  | 'right'
  | 'bottom'
  | 'chartArea'
  | undefined;

const right: ChartPosition = 'right';
const top: ChartPosition = 'top';
const left: ChartPosition = 'left';
const bottom: ChartPosition = 'bottom';
const center: ChartPosition = 'center';

const defaultOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    gridLines: {
      display: false
    }
  },
  plugins: {
    legend: {
      position: bottom,
      maxHeight: 50,
      labels: {
        padding: 20,
      }
    }
  }
};

const getDefaultData = (data: ProjectItem[]) => ({
  labels: data.map((el) => el.name),
  datasets: [
    {
      label: 'Projects',
      data: data.map((el) => el.views),
      backgroundColor: randomBrightColor(data.length),
      borderWidth: 0,
      radius: 150,
      cutout: 200
    }
  ]
});

const type: ChartType = 'doughnut';

const getDefProps = (items: ProjectItem[]) => {
  const data = getDefaultData(items);
  return {
    type,
    labels: data.labels,
    dataSets: data.datasets,
    options: defaultOptions
  };
};

export default getDefProps;
