import React, { useState } from 'react';
import { Services } from '../../../services/Services.jsx';// ✅ Импортируем Services
import  UseAuth  from '../../Login/UseAuth.jsx'
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

const AddProductForm = () => {
  const queryClient = useQueryClient();
  const { logout } = UseAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ 
    name: '',
    description: '',
    price: '',
    category: 'питбайки',
  });
  
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(false);

  const categories = [
    { value: 'питбайки', label: '🏍️ Питбайки', categoryId: 1},
    { value: 'электровелосипеды', label: '⚡ Электровелосипеды', categoryId: 2},
    { value: 'запчасти', label: '🔧 Запчасти', categoryId: 3}
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('❌ Файл слишком большой! Максимум 5MB');
        return;
      }
      if (!file.type.startsWith('image/')) {
        alert('❌ Пожалуйста, выберите изображение');
        return;
      }
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    if (!formData.name  || !formData.description) {
      alert('❌ Пожалуйста, заполните все обязательные поля');
      setLoading(false);
      return;
    }
    
    try {
      const token = localStorage.getItem('token');
      const formDataToSend = new FormData();
      const price = formData.price && formData.price !== '' ? parseFloat(formData.price) : 0;
      formDataToSend.append('name', formData.name);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('price', price);
      formDataToSend.append('category', formData.category);
      if (imageFile) formDataToSend.append('image', imageFile);
      formDataToSend.append('category_id', categories.find(c => c.value === formData.category)?.categoryId);
      
      const response = await Services.addProduct(token, formDataToSend);

      if (response.status === 200 || response.status === 201) {
        alert('✅ Товар успешно добавлен!');
        setFormData({ name: '', description: '', price: '', category: 'мотоциклы' });
        removeImage();
        queryClient.invalidateQueries(['categoryName']);
      } else {
        alert(`❌ Ошибка: ${response.data?.detail || 'Не удалось добавить товар'}`);
      }
    } catch (error) {
      if (error.response?.status === 401) {
        alert('❌ Сессия истекла, пожалуйста, войдите заново');
        logout();
        navigate('/login');
      } else {
        alert(`❌ ${error.response?.data?.detail || 'Ошибка соединения'}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/10">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
        <span className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center">
          <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </span>
        Добавить новый товар
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label className="block text-gray-300 font-medium mb-2">Название товара *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30 transition-all"
              placeholder="Например: Yamaha R1"
            />
          </div>

          <div>
            <label className="block text-gray-300 font-medium mb-2">Цена (₽) *</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              step="0.01"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30 transition-all"
              placeholder="1000"
            />
          </div>

          <div>
            <label className="block text-gray-300 font-medium mb-2">Категория</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-amber-500/50 transition-all appearance-none"
              style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23999'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px center', backgroundSize: '20px' }}
            >
              {categories.map(cat => (
                <option key={cat.value} value={cat.value} className="text-gray-900">{cat.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-300 font-medium mb-2">Изображение</label>
            {!imagePreview ? (
              <div 
                className="border-2 border-dashed border-white/10 rounded-xl p-6 text-center hover:border-amber-500/30 transition cursor-pointer bg-white/2"
                onClick={() => document.getElementById('file-input').click()}
              >
                <input id="file-input" type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                <div className="text-3xl mb-2">📸</div>
                <p className="text-gray-400 text-sm">Нажмите для выбора</p>
                <p className="text-gray-500 text-xs mt-1">PNG, JPG, WEBP (макс. 5MB)</p>
              </div>
            ) : (
              <div className="relative">
                <img src={imagePreview} alt="Preview" className="w-full h-40 object-cover rounded-xl border border-white/10" />
                <button type="button" onClick={removeImage} className="absolute top-2 right-2 bg-red-500/90 hover:bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center transition">
                  ✕
                </button>
              </div>
            )}
          </div>
        </div>

        <div>
          <label className="block text-gray-300 font-medium mb-2">Описание</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="4"
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30 transition-all resize-none"
            placeholder="Подробное описание товара..."
          />
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-amber-500 hover:bg-amber-400 text-white font-medium py-3 rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-95 hover:shadow-lg hover:shadow-amber-500/25 disabled:opacity-50 disabled:hover:scale-100"
          >
            {loading ? '⏳ Добавление...' : '➕ Добавить товар'}
          </button>
          <button
            type="button"
            onClick={() => {
              setFormData({ name: '', description: '', price: '', category: 'мотоциклы' });
              removeImage();
            }}
            className="px-6 bg-white/5 border border-white/10 text-gray-300 hover:text-white rounded-xl hover:bg-white/10 transition-all duration-300"
          >
            Очистить
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProductForm;

