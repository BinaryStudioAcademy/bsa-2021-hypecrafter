import { Chart } from 'chart.js';
import { ChartType } from '../../components/Chart';

function getGradient(ctx: CanvasRenderingContext2D, chartArea: { bottom: number; top: number }) {
  const gradient = ctx.createLinearGradient(
    0,
    chartArea.bottom,
    0,
    chartArea.top
  );
  gradient.addColorStop(0, '#17e5e8');
  gradient.addColorStop(1, '#27aaf2');
  return gradient;
}

const defaultOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      grid: {
        display: false
      }
    },
    y: {
      grid: {
        drawBorder: false,
        borderDash: [8],
        color: 'rgba(255,255,255, 0.4)'
      }
    }
  }
};

const defaultData = {
  labels: ['Tech', 'Health', 'Game', 'Film', 'Podcast', 'Transportation', 'Education', 'Art', 'Home'],
  datasets: [
    {
      label: 'Invested projects',
      data: [12, 19, 3, 5, 2, 3, 7, 8, 9],
      fill: false,
      backgroundColor(context: { chart: Chart }): CanvasGradient | null {
        const { chart } = context;
        const { ctx, chartArea } = chart;

        if (!chartArea) {
          return null;
        }

        return getGradient(ctx, chartArea);
      },
      borderColor(context: { chart: Chart }): CanvasGradient | null {
        const { chart } = context;
        const { ctx, chartArea } = chart;

        if (!chartArea) {
          return null;
        }

        return getGradient(ctx, chartArea);
      },
      barThickness: 20,
      borderRadius: 2
    }
  ]
};

const type: ChartType = 'bar';

const defaultProps = {
  type,
  data: defaultData,
  options: defaultOptions
};

export default defaultProps;
