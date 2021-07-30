function getGradient(ctx: any, chartArea: any) {
  const gradient = ctx.createLinearGradient(
    0,
    chartArea.bottom,
    0,
    chartArea.top
  );
  gradient.addColorStop(0, 'rgb(23, 229, 232)');
  gradient.addColorStop(1, 'rgb(39, 170, 242)');

  return gradient;
}

const testData = {
  labels: ['1', '2', '3', '4', '5', '6'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      fill: false,
      backgroundColor: 'rgb(23, 229, 232)',
      borderColor(context: any): any {
        const { chart } = context;
        const { ctx, chartArea } = chart;

        if (!chartArea) {
          return null;
        }
        return getGradient(ctx, chartArea);
      }
    }
  ]
};

export default testData;
