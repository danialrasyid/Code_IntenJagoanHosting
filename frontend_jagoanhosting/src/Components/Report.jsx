import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar/Sidebar';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Report = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [monthlyData, setMonthlyData] = useState([]);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/report/summary');
        setSummary(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching report summary:', error);
        setLoading(false);
      }
    };

    const fetchMonthlyData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/report/monthly');
        setMonthlyData(response.data.data);
      } catch (error) {
        console.error('Error fetching monthly report data:', error);
      }
    };

    fetchSummary();
    fetchMonthlyData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  const chartData = {
    labels: monthlyData.map((data) => data.month),
    datasets: [
      {
        label: 'Pemasukan',
        data: monthlyData.map((data) => data.pemasukan),
        borderColor: 'blue',
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        fill: true,
      },
      {
        label: 'Pengeluaran',
        data: monthlyData.map((data) => data.pengeluaran),
        borderColor: 'red',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        fill: true,
      },
    ],
  };

  const chartOptions = {
    maintainAspectRatio: false, 
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-3/4 p-8">
        <h2 className="text-2xl font-bold mb-4 text-blue-500">Laporan Keuangan</h2>
        {summary && (
          <div className="mb-4">
            <h3 className="text-lg font-bold">Pemasukan: Rp{summary.pemasukan}</h3>
            <h3 className="text-lg font-bold">Pengeluaran: Rp{summary.pengeluaran}</h3>
            <h3 className="text-lg font-bold">Saldo: Rp{summary.saldo}</h3>
          </div>
        )}
        <div style={{ width: '600px', height: '300px' }}>
          <Line data={chartData} options={chartOptions} />
        </div>
        <div className="mt-8 overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-indigo-700 text-white">
                <th className="border border-gray-200 px-4 py-2">No</th>
                <th className="border border-gray-200 px-4 py-2">Bulan</th>
                <th className="border border-gray-200 px-4 py-2">Jumlah Pemasukan</th>
                <th className="border border-gray-200 px-4 py-2">Jumlah Pengeluaran</th>
                <th className="border border-gray-200 px-4 py-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {monthlyData.map((data, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                  <td className="border border-gray-200 px-4 py-2 text-center">{index + 1}</td>
                  <td className="border border-gray-200 px-4 py-2 text-center">{data.month}</td>
                  <td className="border border-gray-200 px-4 py-2 text-center">Rp{data.pemasukan}</td>
                  <td className="border border-gray-200 px-4 py-2 text-center">Rp{data.pengeluaran}</td>
                  <td className="border border-gray-200 px-4 py-2 text-center">
                    <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-500">Detail</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4 flex justify-center space-x-2">
            <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-500">1</button>
            <button className="bg-white text-indigo-600 px-4 py-2 rounded hover:bg-indigo-500 hover:text-white">2</button>
            <button className="bg-white text-indigo-600 px-4 py-2 rounded hover:bg-indigo-500 hover:text-white">3</button>
            <button className="bg-white text-indigo-600 px-4 py-2 rounded hover:bg-indigo-500 hover:text-white">4</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;
