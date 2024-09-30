import React from 'react';
import RumahCard from './Card/RumahCard';

const RumahList = ({ rumahData }) => {
  return (
    <div className="mt-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        {rumahData.map((rumah) => (
          <RumahCard key={rumah.id} rumah={rumah} />
        ))}
      </div>
    </div>
  );
};

export default RumahList;
