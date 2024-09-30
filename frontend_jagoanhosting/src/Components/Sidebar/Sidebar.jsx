import React, { useState } from 'react';
import { FaHome, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';  

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false); 
  const [activeLink, setActiveLink] = useState('/');

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = (link) => {
    setActiveLink(link);
    setIsOpen(false);
  };

  return (
    <div>
      <button 
        onClick={toggleSidebar} 
        className="md:hidden p-3 text-white bg-blue-900 z-30">
        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Sidebar */}
      <aside 
        className={`fixed md:static min-h-screen w-64 flex flex-col justify-between transition-transform duration-300 z-30 bg-blue-900 text-white ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
        style={{ overflowY: 'auto' }} 
      >
        <div>
          <div className="flex flex-col items-center mt-6 mb-8">
            <div className="bg-blue-900 rounded-full p-3">
              <FaHome className="text-white w-12 h-12" />
            </div>
            <h2 className="mt-2 text-lg font-bold">Dataset</h2>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col space-y-4">
            <a href="/" onClick={() => handleLinkClick('/')} className={`flex items-center p-3 rounded-lg mx-4`}>
              Dashboard
            </a>
            <a href="/data-rumah" onClick={() => handleLinkClick('/data-rumah')} className={`flex items-center p-3 rounded-lg mx-4`}>
              Data Rumah
            </a>
            <a href="/data-iuran" onClick={() => handleLinkClick('#data-iuran')} className={`flex items-center p-3 rounded-lg mx-4`}>
              Data Iuran
            </a>
            <a href="/report" onClick={() => handleLinkClick('#report')} className={`flex items-center p-3 rounded-lg mx-4`}>
              Report
            </a>
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="flex items-center p-3 mx-4 mb-14 hover:bg-blue-800 rounded-lg">
          <FaSignOutAlt className="mr-2" />
          <span>Keluar</span>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
