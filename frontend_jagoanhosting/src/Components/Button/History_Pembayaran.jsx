import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../Sidebar/Sidebar';

const HistoryPembayaran = () => {
  const { id } = useParams();
  const [pembayaran, setPembayaran] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchPembayaran = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/pembayaran/${id}`);
        setPembayaran(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching pembayaran history:', error);
        setLoading(false);
      }
    };

    fetchPembayaran();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!pembayaran) {
    return <p>Data pembayaran tidak ditemukan.</p>;
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-3/4 p-8">
        <h2 className="text-2xl font-bold mb-4">Resep Bukti Pembayaran</h2>
        <div className="border border-gray-300 p-4 rounded-md mb-6 bg-white">
          <p><strong>Nama Penghuni:</strong> {pembayaran.penghuni.nama_lengkap}</p>
          <p><strong>No Rumah:</strong> {pembayaran.rumah_id}</p>
          <p><strong>Tanggal Pembayaran:</strong> {pembayaran.tanggal_pembayaran}</p>
          <p><strong>Jenis Iuran:</strong> {pembayaran.jenis_iuran}</p>
          <p><strong>Jumlah Iuran:</strong> {pembayaran.jumlah}</p>
          <p><strong>Status:</strong> {pembayaran.status}</p>
        </div>

        <button
          onClick={() => navigate(-1)}
          className="bg-gray-500 text-white px-4 py-2 rounded-md"
        >
          Kembali
        </button>
      </div>
    </div>
  );
};

export default HistoryPembayaran;
