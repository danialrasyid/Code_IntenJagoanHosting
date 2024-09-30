import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import RumahList from './RumahList';
import Sidebar from './Sidebar/Sidebar';

const DataRumah = () => {
  const [rumahData, setRumahData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/rumah');
        setRumahData(response.data.data);
      } catch (error) {
        console.error("Error fetching the data: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDeleteRumah = (id) => {
    setRumahData(prevRumahData => prevRumahData.filter(rumah => rumah.id !== id));
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-4 md:p-6 bg-gray-100 relative z-10">
        <h1 className="text-lg md:text-2xl font-bold text-center mb-4  text-blue-500">
          Data Perumahan
        </h1>

        {/* Button Container */}
        <div className="flex justify-end mb-4">
          <Link to="/data-rumah/tambah" className="flex items-center bg-purple-700 text-white rounded-md px-4 py-2 mr-2">
            <span className="material-icons">Tambah Rumah</span>
          </Link>
        </div>

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <RumahList rumahData={rumahData} onDelete={handleDeleteRumah} />
        )}
      </main>
    </div>
  );
};

export default DataRumah;
