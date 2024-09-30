import React from "react";
import { Route, Routes } from "react-router-dom";
import './App.css';
import './index.css';
import Dashboard from './Components/Dashboard';
import Data_Rumah from "./Components/Data_Rumah";
import Tambah_Rumah from "./Components/Button/Tambah_Rumah";
import DetailRumah from "./Components/Detail/Detail_Rumah";
import Tambah_Penghuni from "./Components/Button/Tambah_Penghuni";
import Edit_Penghuni from "./Components/Button/Edit_Penghuni";
import Data_Iuran from "./Components/Data_Iuran";
import Report from "./Components/Report";
import DetailReport from "./Components/Detail/Detail_Report";
import Tambah_Pembayaran from "./Components/Button/Tambah_Pembayaran";
import HistoryPembayaran from "./Components/Button/History_Pembayaran";


function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Dashboard/>} />
        <Route path="/data-rumah" element={<Data_Rumah />} />
        <Route path="/data-rumah/tambah" element={<Tambah_Rumah />} />
        <Route path="/data-rumah/edit/:id" element={<Tambah_Rumah />} /> 
        <Route path="/data-rumah/detail/:id" element={<DetailRumah/>}/>
        <Route path="/data-rumah/tambah-penghuni/:id" element={<Tambah_Penghuni/>}/>
        <Route path="/data-rumah/edit-penghuni/:id" element={<Edit_Penghuni />} />
        <Route path="/data-iuran" element={<Data_Iuran />} />
        <Route path="/report" element={<Report />} />
        <Route path="/report/detail" element={<DetailReport />} />
        <Route path="/data-iuran/tambah" element={<Tambah_Pembayaran />} />
        <Route path="/data-iuran/history/:id" element={<HistoryPembayaran />} />

      </Routes>
    </div>
  );
}

export default App;
