import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';

const Tambah_Rumah = () => {
  const [formData, setFormData] = useState({
    keluarga: '',
    foto_rumah: null,
    alamat: '',
    status: 'Dihuni',
    penghuni_id: ''
  });

  const navigate = useNavigate();
  const { id } = useParams(); 

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'foto_rumah') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataObj = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataObj.append(key, formData[key]);
    });

    try {
      if (id) {
        await axios.put(`http://127.0.0.1:8000/api/rumah/${id}`, formDataObj);
      } else {
        await axios.post('http://127.0.0.1:8000/api/rumah', formDataObj);
      }
      navigate('/data-rumah'); 
    } catch (error) {
      console.error("Error saving the data: ", error);
    }
  };

  return (
    <div className="flex">
      <Sidebar /> 
      <div className="p-4 flex-1">
        <h2 className="text-2xl font-bold mb-4">Tambah/Edit Rumah</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          <input
            type="text"
            name="keluarga"
            value={formData.keluarga}
            onChange={handleInputChange}
            placeholder="Nama Keluarga"
            className="p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="text"
            name="alamat"
            value={formData.alamat}
            onChange={handleInputChange}
            placeholder="Alamat"
            className="p-2 border border-gray-300 rounded"
            required
          />
          <select
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded"
            required
          >
            <option value="Dihuni">Dihuni</option>
            <option value="Tidak Dihuni">Tidak Dihuni</option>
          </select>      

          <input
            type="file"
            name="foto_rumah"
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded"
          />
          
          <div className="flex">
            <button type="submit" className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-md">
              {id ? 'Update Rumah' : 'Tambah Rumah'}
            </button>
            <button 
              type="button" 
              onClick={() => navigate('/data-rumah')}
              className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-md ml-2">
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Tambah_Rumah;
