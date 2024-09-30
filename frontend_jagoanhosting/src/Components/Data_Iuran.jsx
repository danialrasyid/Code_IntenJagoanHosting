import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar/Sidebar';
import { Link } from 'react-router-dom';

const DataIuran = () => {
  const [dataIuran, setDataIuran] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchDataIuran = async (page = 1) => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/pembayaran?page=${page}`);
        const responseData = response.data.data; 
        setDataIuran(responseData.data || []); 
        setTotalPages(responseData.last_page); 
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data iuran:', error);
        setLoading(false);
      }
    };

    fetchDataIuran(currentPage);
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!Array.isArray(dataIuran)) {
    return <p>Data tidak ditemukan atau data salah format</p>;
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-3/4 p-8">
        <h2 className="text-2xl font-bold mb-4 text-blue-500">Data Iuran Rumah</h2>
        <Link to="/data-iuran/tambah" className="mb-4 inline-block bg-[#E66B00] text-white px-4 py-2 rounded-md">
          Tambah Pembayaran
        </Link>
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-0 border-b bg-blue-700 text-white">No</th>
              <th className="py-2 px-4 border-b bg-blue-700 text-white">Nama Penghuni</th>
              <th className="py-2 px-4 border-b bg-blue-700 text-white">No Rumah</th>
              <th className="py-2 px-4 border-b bg-blue-700 text-white">Jenis Iuran</th>
              <th className="py-2 px-4 border-b bg-blue-700 text-white">Jumlah Iuran</th>
              <th className="py-2 px-4 border-b bg-blue-700 text-white">Status</th>
              <th className="py-2 px-4 border-b bg-blue-700 text-white">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {dataIuran.map((iuran, index) => (
              <tr key={iuran.id} className="hover:bg-gray-100">
                <td className="py-2 px-6 border-b">{index + 1}</td>
                <td className="py-2 px-12 border-b">{iuran.penghuni.nama_lengkap}</td>
                <td className="py-2 px-14 border-b">{iuran.rumah.keluarga}</td>
                <td className="py-2 px-8 border-b">{iuran.jenis_iuran}</td>
                <td className="py-2 px-10 border-b">{iuran.jumlah}</td>
                <td className="py-2 px-10 border-b">{iuran.status}</td>
                <td className="py-2 px-10 border-b">
                  <Link to={`/data-iuran/history/${iuran.id}`} className="text-white p-1 rounded-lg bg-blue-700">History</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4">
          <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
        </div>
      </div>
    </div>
  );
};

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="flex list-none">
        {pageNumbers.map((number) => (
          <li key={number} className="mx-1">
            <button
              onClick={() => onPageChange(number)}
              className={`px-3 py-1 border rounded ${
                currentPage === number ? 'bg-blue-500 text-white' : 'bg-white'
              }`}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default DataIuran;
