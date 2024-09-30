import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';

const DetailReport = () => {
  const [detailReport, setDetailReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  
  const queryParams = new URLSearchParams(location.search);
  const month = queryParams.get('month');
  const year = queryParams.get('year');

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/report/detail?month=${month}&year=${year}`);
        setDetailReport(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching detail report:', error);
        setLoading(false);
      }
    };

    fetchDetail();
  }, [month, year]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-3/4 p-8">
        <h2 className="text-2xl font-bold mb-4">Detail Laporan Bulanan</h2>
        {/* Tampilkan detail pembayaran */}
        <h3 className="text-lg font-bold mb-2">Pembayaran</h3>
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">No</th>
              <th className="py-2 px-4 border-b">Nama Penghuni</th>
              <th className="py-2 px-4 border-b">Jumlah</th>
            </tr>
          </thead>
          <tbody>
            {detailReport.pembayaran.map((item, index) => (
              <tr key={item.id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">{index + 1}</td>
                <td className="py-2 px-4 border-b">{item.penghuni.nama_lengkap}</td>
                <td className="py-2 px-4 border-b">Rp{item.jumlah}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Tampilkan detail pengeluaran */}
        <h3 className="text-lg font-bold mb-2">Pengeluaran</h3>
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">No</th>
              <th className="py-2 px-4 border-b">Deskripsi</th>
              <th className="py-2 px-4 border-b">Jumlah</th>
            </tr>
          </thead>
          <tbody>
            {detailReport.pengeluaran.map((item, index) => (
              <tr key={item.id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">{index + 1}</td>
                <td className="py-2 px-4 border-b">{item.deskripsi}</td>
                <td className="py-2 px-4 border-b">Rp{item.jumlah}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DetailReport;
