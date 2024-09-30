import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RumahList from './RumahList';
import Sidebar from './Sidebar/Sidebar'; 
import dashboard from './assets/dashboard.png'; 

const Dashboard = () => {
  const [rumahData, setRumahData] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/rumah');
        setRumahData(response.data.data);
        setLoading(false); 
      } catch (error) {
        console.error("Error fetching the data: ", error);
        setLoading(false); 
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex static">
      <Sidebar />
      <main className="flex-1 p-4 md:p-6 bg-gray-100 relative z-10">
        <div className="relative text-center">
          <img 
            src={dashboard} 
            alt="Dashboard" 
            className="w-full h-auto max-h-60 object-cover rounded-md" 
          />
          <div className="absolute inset-0 bg-black opacity-40 rounded-md z-20" />
          <div className="absolute inset-0 flex flex-col justify-center items-center z-30">
            <h1 className="text-lg md:text-2xl font-bold text-white bg-opacity-80 p-2 rounded">
              Cek Data Iuran dan Laporan Keuangan Perumahan
            </h1>
            <button className="mt-2 md:mt-4 px-4 py-2 bg-white text-orange-500 rounded-md">
              Detail
            </button>
          </div>
        </div>
        <br />
        <div>
        <h2 className="text-xl font-semibold text-blue-500">Data Perumahan</h2>
        </div>
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <RumahList rumahData={rumahData} />
        )}
      </main>
    </div>
  );
};

export default Dashboard;
