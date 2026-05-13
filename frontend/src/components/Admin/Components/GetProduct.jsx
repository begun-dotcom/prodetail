import React, { useState } from 'react';
import { useQuery , useQueryClient} from '@tanstack/react-query';
import {Services} from '../../../services/Services'
import EditProductModal from './EditProductModal'


function GetProduct() {
  const [activeTab, setActiveTab] = useState('Мотоциклы');
  const [error, setError] = useState('');
  const queryClient = useQueryClient();
  const [editingProduct, setEditingProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: categoryData = [], isLoading: isLoadingCategories } = useQuery({
    queryKey: ['category'],
    queryFn: async () => await Services.getCategory(),
    staleTime: 5 * 60 * 1000,
    retry: 3,
    refetchOnWindowFocus: true,
  });

  const { data: productsData = [], isLoading: isLoadingProducts } = useQuery({
    queryKey: ['categoryName', activeTab],
    queryFn: async () => await Services.getCategoryByName(activeTab),
    staleTime: 5 * 60 * 1000,
    retry: 3,
    refetchOnWindowFocus: true,
    enabled: !!activeTab,
  });

  const categories = categoryData?.data || [];
  const products = productsData?.data || [];

  const openEditModal = (product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const closeEditModal = () => {
    setEditingProduct(null);
    setIsModalOpen(false);
  };

  const handleUpdateProduct = async (productId, updatedData) => {
    try {
      const response = await Services.updateProduct(productId, updatedData);
      if (response.status === 200) {
        alert('✅ Товар успешно обновлен!');
        queryClient.invalidateQueries(['categoryName', activeTab]);
        closeEditModal();
      }
    } catch (error) {
      alert('❌ Не удалось обновить товар');
    }
  };

  const deleteProduct = async (productId, productName) => {
    if (!window.confirm(`Вы уверены, что хотите удалить товар "${productName}"?`)) return;
    try {
      const token = localStorage.getItem('token');
      const response = await Services.deleteProduct(productId, token);
      if (response.status === 200) {
        queryClient.invalidateQueries(['categoryName', activeTab]);
      }
    } catch (error) {
      setError(error.response?.data?.detail || 'Ошибка удаления');
    }
  };

  return (
    <div className='w-full'>
      {/* Табы категорий */}
      <div className='flex flex-wrap gap-2 mb-6 justify-center'>
        {categories.map(cat => (
          <button 
            key={cat.id}
            onClick={() => setActiveTab(cat.name)}
            className={`px-5 py-2.5 rounded-xl font-medium transition-all duration-300 ${
              activeTab === cat.name 
                ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/25' 
                : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10 border border-white/10'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Сетка товаров */}
      {isLoadingProducts ? (
        <div className="text-center py-10">
          <div className="w-10 h-10 border-4 border-amber-500/30 border-t-amber-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Загрузка...</p>
        </div>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
          {products.map(prod => (
            <div key={prod.id} className='bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-amber-500/20 transition-all duration-300 overflow-hidden group'>
              <div className='relative h-44 bg-white/2 overflow-hidden'>
                {prod.image_url ? (
                  <img src={prod.image_url} alt={prod.name} className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500' />
                ) : (
                  <div className='w-full h-full flex items-center justify-center text-gray-600'>
                    <svg className='w-12 h-12' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' />
                    </svg>
                  </div>
                )}
                <div className='absolute top-3 right-3 bg-amber-500 text-white px-2.5 py-1 rounded-lg text-sm font-bold shadow-lg'>
                    {Number(prod.price) > 0 
                        ? `${Number(prod.price).toLocaleString()} ₽` 
                        : 'Уточняйте цену'
                    }
                    </div>
              </div>
              
              <div className='p-4'>
                <h3 className='text-white font-semibold text-base mb-1.5 line-clamp-1'>{prod.name}</h3>
                <p className='text-gray-400 text-sm mb-4 line-clamp-2 h-9'>{prod.description}</p>
                
                <div className='flex gap-2 pt-3 border-t border-white/5'>
                  <button 
                    onClick={() => openEditModal(prod)}
                    className='flex-1 bg-amber-500/80 hover:bg-amber-500 text-white px-3 py-2 rounded-lg transition-all duration-200 text-sm font-medium flex items-center justify-center gap-1.5 hover:scale-[1.02]'
                  >
                    <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' />
                    </svg>
                    Изменить
                  </button>
                  <button 
                    onClick={() => deleteProduct(prod.id, prod.name)}
                    className='flex-1 bg-red-500/20 hover:bg-red-500/40 text-red-400 hover:text-red-300 px-3 py-2 rounded-lg transition-all duration-200 text-sm font-medium flex items-center justify-center gap-1.5 border border-red-500/20 hover:border-red-500/40'
                  >
                    <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16' />
                    </svg>
                    Удалить
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && editingProduct && (
        <EditProductModal product={editingProduct} onClose={closeEditModal} onUpdate={handleUpdateProduct} />
      )}
    </div>
  );
}


export default GetProduct
