
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top",
      labels: {
        color: 'var(--text-color)',
        font: {
          size: 12
        }
      }
    },
    title: {
      display: true,
      text: "Portfolio Holdings Distribution",
      color: 'var(--text-color)',
      font: {
        size: 16,
        weight: 'bold'
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
          return `${context.dataset.label}: ₹${context.parsed.y.toLocaleString('en-IN')}`;
        }
      }
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        color: 'var(--text-secondary)',
        callback: function(value) {
          return '₹' + value.toLocaleString('en-IN');
        }
      },
      grid: {
        color: 'var(--border-color)'
      }
    },
    x: {
      ticks: {
        color: 'var(--text-secondary)'
      },
      grid: {
        color: 'var(--border-color)'
      }
    }
  },
  animation: {
    duration: 1000,
    easing: 'easeInOutQuart'
  }
};

export function VerticalGraph({ data }) {
  return (
    <div style={{ height: '400px', marginTop: '20px', padding: '20px', background: 'var(--card-bg)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
      <Bar options={options} data={data} />
    </div>
  );
}
    