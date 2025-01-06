import { Chart } from 'chart.js';
import { toPng } from 'html-to-image';

export const getChartImage = async (chartRef) => {
  if (!chartRef.current) return null;
  const canvas = chartRef.current.chartInstance.canvas;
  return toPng(canvas);
};
