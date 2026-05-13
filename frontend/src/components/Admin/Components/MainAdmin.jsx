import React, { useState } from 'react';
import AddProductForm from './AddProductForm';
import Container from '../../General/Container';
import GetProduct from './GetProduct'

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('add');

  return (
    <div className="min-h-screen w-full mt-12 md:mt-16 relative bg-linear-to-br from-[#18202a] to-[#1a1f2b]">
      {/* Текстурный слой */}
      <div 
        className='absolute inset-0 opacity-[0.03] pointer-events-none'
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.3) 0.5px, transparent 0.5px)',
          backgroundSize: '15px 15px'
        }}
      />
      <div className='absolute inset-0 bg-linear-to-br from-white/1 via-transparent to-white/2 pointer-events-none' />
      
      <Container className='relative z-10 pt-6 pb-10 bg-transparent!'>
        {/* Заголовок */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/10 mb-6">
          <h1 className="text-3xl font-bold text-white">Админ-панель</h1>
          <p className="text-gray-400 mt-2">Управление товарами</p>
        </div>

        {/* Табы */}
        <div className="flex gap-2 mb-6 justify-center">
          <button 
            onClick={() => setActiveTab('add')} 
            className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
              activeTab === 'add' 
                ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/25' 
                : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10 border border-white/10'
            }`}
          >
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Добавить товар
            </span>
          </button>
          <button
            onClick={() => setActiveTab('list')} 
            className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
              activeTab === 'list' 
                ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/25' 
                : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10 border border-white/10'
            }`}
          >
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
              Список товаров
            </span>
          </button>
        </div>

        {/* Контент */}
        {activeTab === 'add' && <AddProductForm />}
        {activeTab === 'list' && <GetProduct />}
      </Container>
    </div>
  );
};

export default AdminPanel;