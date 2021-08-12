import { ChartType } from '../../../components/Chart/Chart';
import { Project } from '../interfaces';
import { randomBrightColor } from '../../../helpers';

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
      display: false
    }
  }
};

const getDefaultData = (data: Project[]) => ({
  labels: data.map((el) => el.name),
  datasets: [
    {
      label: 'Projects',
      data: data.map((el) => el.donated),
      backgroundColor: randomBrightColor(data.length),
      borderWidth: 0.4,
      radius: 150,
      cutout: 135
    }
  ]
});

const type: ChartType = 'doughnut';

const getDefProps = (items: Project[]) => {
  const data = getDefaultData(items);
  return {
    type,
    labels: data.labels,
    dataSets: data.datasets,
    options: defaultOptions
  };
};

export default getDefProps;
