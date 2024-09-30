import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../Sidebar/Sidebar';

const FormEditPenghuni = () => {
  const { id } = useParams(); 
  const navigate = useNavigate(); 
  const [formData, setFormData] = useState({
    nama_lengkap: '',
    status: 'Tetap',
    nomor_telepon: '',
    status_menikah: 'Belum',
    foto_ktp: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPenghuni = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/penghuni/${id}`);
        const penghuni = response.data.data;
        setFormData({
          nama_lengkap: penghuni.nama_lengkap || '',
          status: penghuni.status || 'Tetap',
          nomor_telepon: penghuni.nomor_telepon || '',
          status_menikah: penghuni.status_menikah || 'Belum',
          foto_ktp: null, 
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching penghuni:', error);
        setLoading(false);
      }
    };

    fetchPenghuni();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, foto_ktp: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('nama_lengkap', formData.nama_lengkap);
    formDataToSend.append('status', formData.status);
    formDataToSend.append('nomor_telepon', formData.nomor_telepon);
    formDataToSend.append('status_menikah', formData.status_menikah);
    if (formData.foto_ktp) {
      formDataToSend.append('foto_ktp', formData.foto_ktp);
    }
  
    try {
      await axios.post(`http://127.0.0.1:8000/api/penghuni/${id}`, formDataToSend);
      alert('Penghuni berhasil diperbarui.');
      navigate(`/data-rumah/detail/${id}`); // Navigasi kembali ke halaman detail rumah
    } catch (error) {
      if (error.response) {
        console.error('Response Error:', error.response.data);
        alert(`Gagal memperbarui penghuni: ${error.response.data.message || 'Silakan coba lagi.'}`);
      } else {
        console.error('Error:', error.message);
        alert('Gagal memperbarui penghuni. Silakan coba lagi.');
      }
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="p-4 flex-1">
        <h2 className="text-2xl font-bold mb-4">Edit Penghuni</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          <div className="mb-4">
            <label className="block mb-2">Nama Lengkap</label>
            <input
              type="text"
              name="nama_lengkap"
              value={formData.nama_lengkap}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded w-full"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded w-full"
              required
            >
              <option value="Tetap">Tetap</option>
              <option value="Kontrak">Kontrak</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-2">Nomor Telepon</label>
            <input
              type="text"
              name="nomor_telepon"
              value={formData.nomor_telepon}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded w-full"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Status Menikah</label>
            <select
              name="status_menikah"
              value={formData.status_menikah}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded w-full"
              required
            >
              <option value="Sudah">Sudah</option>
              <option value="Belum">Belum</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-2">Foto KTP</label>
            <input
              type="file"
              name="foto_ktp"
              onChange={handleFileChange}
              className="p-2 border border-gray-300 rounded w-full"
            />
          </div>

          <div className="flex">
            <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md">
              Simpan
            </button>
            <button
              type="button"
              onClick={() => navigate(`/data-rumah/detail/${id}`)}
              className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-md ml-2"
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormEditPenghuni;
