import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../Sidebar/Sidebar';

const DetailRumah = () => {
    const { id } = useParams();
    const [rumah, setRumah] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
  
    useEffect(() => {
      const fetchRumah = async () => {
        try {
          const response = await axios.get(`http://127.0.0.1:8000/api/rumah/${id}`);
          setRumah(response.data.data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching rumah:', error);
          setLoading(false);
        }
      };
  
      fetchRumah();
    }, [id]);
  
    if (loading) {
      return <p>Loading...</p>;
    }
  
    if (!rumah) {
      return <p>Rumah tidak ditemukan</p>;
    }
  
    const penghuniList = Array.isArray(rumah.penghuni) ? rumah.penghuni : [rumah.penghuni].filter(Boolean);
  
    return (
      <div className="flex">
        <Sidebar />
        <div className="w-3/4 p-8">
          <h2 className="text-2xl font-bold mb-4">Rumah {rumah.keluarga}</h2>
          <img src={`http://127.0.0.1:8000/storage/${rumah.foto_rumah}`} alt="Rumah" className="w-36 h-46 object-cover rounded-md" />
          <p className="mt-4 text-lg">Alamat: {rumah.alamat}</p>
          <p className="text-gray-600">Status: {rumah.status}</p>
          <div className="mt-6">
            <h3 className="text-xl font-bold mb-4">Jumlah Penghuni: {penghuniList.length} Orang</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {penghuniList.map((penghuni) => (
                <div key={penghuni.id} className="border rounded-lg p-4 bg-white shadow-md">
                  {penghuni.foto_ktp && (
                    <img src={`http://127.0.0.1:8000/storage/${penghuni.foto_ktp}`} alt={`Foto ${penghuni.nama_lengkap}`} className="w-full h-32 object-cover rounded-md mb-2" />
                  )}
                  <h4 className="text-lg font-bold">{penghuni.nama_lengkap}</h4>
                  <p className="text-green-600">{penghuni.status}</p>
                  <p className="text-gray-600">Status Menikah: {penghuni.status_menikah}</p>
                  <p className="text-gray-600">Nomor Telepon: {penghuni.nomor_telepon}</p>
                  <button
                    onClick={() => navigate(`/data-rumah/edit-penghuni/${penghuni.id}`)}
                    className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded-md"
                  >
                    Edit 
                  </button>
                </div>
              ))}
              <div className="flex justify-center items-center border rounded-lg p-4 bg-white shadow-md cursor-pointer" onClick={() => navigate(`/data-rumah/tambah-penghuni/${rumah.id}`)}>
                <div className="text-center">
                  <span className="text-4xl">+</span>
                  <p>Tambah / Edit</p>
                </div>
              </div>
            </div>
          </div>
          <Link to="/data-rumah" className="mt-6 inline-block bg-blue-500 text-white px-4 py-2 rounded-md">Kembali ke Data Rumah</Link>
        </div>
      </div>
    );
  };
  
export default DetailRumah;
