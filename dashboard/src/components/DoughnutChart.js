

import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        color: 'var(--text-color)',
        padding: 15,
        font: {
          size: 11
        }
      }
    },
    tooltip: {
      backgroundColor: 'var(--card-bg)',
      titleColor: 'var(--text-color)',
      bodyColor: 'var(--text-color)',
      borderColor: 'var(--border-color)',
      borderWidth: 1,
      padding: 12,
      callbacks: {
        label: function(context) {
          return `${context.label}: ₹${context.parsed.toLocaleString('en-IN')}`;
        }
      }
    }
  },
  animation: {
    animateRotate: true,
    animateScale: true,
    duration: 1000
  }
};

export function DoughnutChart({ data }) {
  return (
    <div style={{ height: '250px', marginTop: '20px' }}>
      <Doughnut data={data} options={options} />
    </div>
  );
}
