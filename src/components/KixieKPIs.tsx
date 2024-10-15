import React from 'react';

interface KixieKPIsProps {
  icon: React.ReactNode;
  title: string;
  value: number | string;
}

const KixieKPIs: React.FC<KixieKPIsProps> = ({ icon, title, value }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6 flex items-center">
      <div className="mr-4">{icon}</div>
      <div>
        <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );
};

export default KixieKPIs;