import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const RumahCard = ({ rumah }) => {
  const handleDelete = async () => {
    if (window.confirm('Apakah Anda yakin ingin menghapus rumah ini?')) {
      const response = await axios.delete(`http://127.0.0.1:8000/api/rumah/${rumah.id}`);

      alert(response.data.message || 'Rumah berhasil dihapus.');
      window.location.reload(); 
    }
  };

  return (
    <div className="border rounded-lg p-4 bg-white shadow-md">
      <img
        src={`http://127.0.0.1:8000/storage/${rumah.foto_rumah}`}
        alt="Rumah"
        className="w-full h-44 object-cover rounded-md"
      />
      <h3 className="text-lg font-bold mt-4">Rumah {rumah.keluarga}</h3>
      <p className="text-gray-600">Alamat: {rumah.alamat}</p>
      <p className="text-gray-600">Status: {rumah.status}</p>
      <p className="text-gray-600">Penghuni: {rumah.penghuni && rumah.penghuni.nama_lengkap}</p>
      <div className="flex justify-between mt-4">
        <Link to={`/data-rumah/detail/${rumah.id}`} className="px-4 py-2 bg-orange-500 text-white rounded-md">
          Detail
        </Link>
        <div className="flex space-x-2">
          <Link to={`/data-rumah/edit/${rumah.id}`} className="px-4 py-2 bg-purple-100 text-purple-800 rounded-md">
            Edit
          </Link>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 text-white rounded-md">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default RumahCard;
