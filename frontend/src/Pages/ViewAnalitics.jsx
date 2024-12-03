import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { useLocation } from 'react-router-dom';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import axios from 'axios';

// Register Chart.js components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

const ViewAnalytics = () => {
  const location = useLocation();
  const { linkData } = location.state || {}; // Get the passed state
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (!linkData) return;

    // Prepare chart data for clicks over time
    const clickData = linkData.clicks.reduce((acc, click) => {
      const date = new Date(click.timestamp).toISOString().split('T')[0]; // Extract date
      acc[date] = (acc[date] || 0) + 1; // Aggregate click counts by date
      return acc;
    }, {});

    const labels = Object.keys(clickData); // Dates
    const data = Object.values(clickData); // Click counts

    setChartData({
      labels,
      datasets: [
        {
          label: 'Clicks Over Time',
          data,
          fill: false,
          borderColor: 'rgba(75,192,192,1)',
          tension: 0.4,
        },
      ],
    });
  }, [linkData]);

  if (!linkData) {
    return <div>No data available</div>;
  }

  const topIPs = linkData.clicks
    .reduce((acc, click) => {
      acc[click.ipAddress] = (acc[click.ipAddress] || 0) + 1;
      return acc;
    }, {});

  const sortedIPs = Object.entries(topIPs)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);
    
// Function to get location details from IP address
async function getLocation(ipAddress) {
    try {
      const response = await fetch(`http://ip-api.com/json/${ipAddress}`);
      const data = await response.json();
      if (data.status === 'success') {
        console.log('Location Data:', data);
        return data;
      } else {
        console.error('Error fetching location:', data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
 
  
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 gap-6 bg-gray-50">
      {/* Header */}
      <h1 className="text-3xl font-bold text-center mb-4 text-gray-800">
        Analytics for{' '}
        <span className="underline text-cyan-600">
          <a href={linkData.originalUrl} target="_blank" rel="noopener noreferrer">
            {linkData.originalUrl}
          </a>
        </span>
      </h1>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        <div className="bg-white shadow-lg p-6 rounded-lg text-center">
          <h2 className="text-lg font-bold text-gray-600">Total Clicks</h2>
          <p className="text-4xl font-extrabold text-cyan-600">{linkData.clickCount}</p>
        </div>
        <div className="bg-white shadow-lg p-6 rounded-lg">
          <h2 className="text-lg font-bold text-gray-600 mb-4">Top Visitors</h2>
          {sortedIPs.length > 0 ? (
            <ul className="space-y-2">
              {sortedIPs.map(([ip, count], index) => (
                <li key={index} className="flex justify-between">
                  <span className="text-sm text-gray-700">
                    <strong>IP:</strong> {ip || 'Unknown'}
                  </span>
                  <span className="text-sm text-gray-500">
                    <strong>Clicks:</strong> {count}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No visitor data available.</p>
          )}
        </div>
      </div>

      {/* Visitor Details Section */}
      <div className="bg-white shadow-lg p-6 rounded-lg w-full max-w-4xl">
        <h2 className="text-lg font-bold mb-4 text-gray-600">Visitor Details</h2>
        {linkData.clicks.length > 0 ? (
          <ul className="space-y-2 max-h-60 overflow-y-auto">
            {linkData.clicks.map((click, index) => (
              <li key={index} className="flex justify-between border-b pb-2">
                <span className="text-sm text-gray-700">
                  <strong>IP:</strong> {click.ipAddress || 'Unknown'}
                </span>
                {/* <span onClick={()=>getLocation(click.ipAddress)}>View Adddress</span> */}
                <span className="text-sm text-gray-500">
                  <strong>Time:</strong>{' '}
                  {new Date(click.timestamp).toLocaleString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                  })}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No visitor data available.</p>
        )}
      </div>

      {/* Line Chart Section */}
      <div className="w-full max-w-4xl">
        <h1 className="text-2xl font-bold text-center mb-4 text-gray-600">Clicks Over Time</h1>
        {chartData ? (
          <Line
            data={chartData}
            options={{
              plugins: {
                legend: {
                  display: true,
                  position: 'top',
                },
              },
              scales: {
                x: {
                  title: {
                    display: true,
                    text: 'Date',
                  },
                },
                y: {
                  title: {
                    display: true,
                    text: 'Number of Clicks',
                  },
                  beginAtZero: true,
                },
              },
            }}
          />
        ) : (
          <div>Loading analytics...</div>
        )}
      </div>

      {/* Share Button */}
      <button
        className="bg-black text-white py-2 px-4 rounded-lg mt-6 hover:bg-gray-600"
        onClick={() => navigator.share?.({ title: 'Original Url', url: linkData.originalUrl })}
      >
        Share Link
      </button>
    </div>
  );
};

export default ViewAnalytics;
