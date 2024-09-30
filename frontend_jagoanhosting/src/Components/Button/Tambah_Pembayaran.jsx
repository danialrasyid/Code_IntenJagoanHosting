import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';

const FormPembayaran = () => {
  const [formData, setFormData] = useState({
    penghuni_id: '',
    rumah_id: '',
    tanggal_pembayaran: '',
    jenis_iuran: 'Satpam',
    jumlah: 100000,
    status: 'Lunas',
  });
  const [penghunis, setPenghunis] = useState([]);
  const [rumahs, setRumahs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPenghunis = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/penghuni');
        setPenghunis(response.data); 
      } catch (error) {
        console.error('Error fetching penghuni:', error);
      }
    };

    const fetchRumahs = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/rumah');
        setRumahs(response.data.data || []); 
      } catch (error) {
        console.error('Error fetching rumah:', error);
      }
    };

    fetchPenghunis();
    fetchRumahs();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'jenis_iuran') {
      let newAmount = value === 'Kebersihan' ? 15000 : 100000;
      setFormData({ ...formData, [name]: value, jumlah: newAmount });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:8000/api/pembayaran', formData);
      alert('Pembayaran berhasil disimpan');
      navigate('/data-iuran'); 
    } catch (error) {
      console.error('Gagal menyimpan pembayaran:', error);
      alert('Gagal menyimpan pembayaran. Silakan coba lagi.');
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-3/4 p-8">
        <h2 className="text-2xl font-bold mb-4">Tambah Pembayaran</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Nama Penghuni</label>
            <select
              name="penghuni_id"
              value={formData.penghuni_id}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            >
              <option value="">Pilih Penghuni</option>
              {Array.isArray(penghunis) && penghunis.map((penghuni) => (
                <option key={penghuni.id} value={penghuni.id}>
                  {penghuni.nama_lengkap}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-2">No Rumah</label>
            <select
              name="rumah_id"
              value={formData.rumah_id}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            >
              <option value="">Pilih Rumah</option>
              {Array.isArray(rumahs) && rumahs.map((rumah) => (
                <option key={rumah.id} value={rumah.id}>
                  {rumah.keluarga}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-2">Tanggal Pembayaran</label>
            <input
              type="date"
              name="tanggal_pembayaran"
              value={formData.tanggal_pembayaran}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Jenis Iuran</label>
            <select
              name="jenis_iuran"
              value={formData.jenis_iuran}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            >
              <option value="Satpam">Satpam</option>
              <option value="Kebersihan">Kebersihan</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-2">Jumlah</label>
            <input
              type="number"
              name="jumlah"
              value={formData.jumlah}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              readOnly 
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            >
              <option value="Lunas">Lunas</option>
              <option value="Belum">Belum</option>
            </select>
          </div>

          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Simpan
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormPembayaran;
