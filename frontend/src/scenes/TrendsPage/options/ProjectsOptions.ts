import { ProjectNameMaxLength } from '../../../common/constans';
import { ChartType } from '../../../components/Chart';
import { randomBrightColor, сutWord } from '../../../helpers';
import { ProjectItem } from '../interfaces';

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

const getDefaultData = (data: ProjectItem[]) => ({
  labels: data.map((el) => сutWord(el.name, ProjectNameMaxLength)),
  datasets: [
    {
      label: 'Projects',
      data: data.map((el) => el.views),
      backgroundColor: randomBrightColor(data.length),
      borderWidth: 0,
      radius: 150,
      cutout: 135
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
