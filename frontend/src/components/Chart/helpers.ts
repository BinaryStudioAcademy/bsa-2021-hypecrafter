/* eslint-disable  @typescript-eslint/no-explicit-any */
const blueColors = ['rgb(23, 229, 232)', 'rgb(39, 170, 242)'];

const getLinearGradient = (ctx: any, chartArea: any, colors: string[]) => {
  const gradient = ctx.createLinearGradient(
    0,
    chartArea.bottom,
    0,
    chartArea.top
  );
  const point = 1 / colors.length;

  colors.forEach((elem, index) => gradient.addColorStop(index * point, elem));

  return gradient;
};

function setBorderColorGradient(colors: string[]) {
  const setFunc = (context: any): any => {
    const { chart } = context;
    const { ctx, chartArea } = chart;

    if (!chartArea) {
      return null;
    }
    return getLinearGradient(ctx, chartArea, colors);
  };

  return setFunc;
}

export { setBorderColorGradient, blueColors };
