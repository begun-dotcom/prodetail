import { useState } from 'react';

function EditProductModal({ product, onClose, onUpdate }) {
    const [formData, setFormData] = useState({
        name: product.name,
        description: product.description,
        price: product.price,
        category_id: product.category_id
    });
    
    const [newImage, setNewImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(product.image_url);
    const [loading, setLoading] = useState(false);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNewImage(file);
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.name);
        formDataToSend.append('description', formData.description);
        formDataToSend.append('price', formData.price);
        formDataToSend.append('category_id', formData.category_id);
        
        if (newImage) {
            formDataToSend.append('image', newImage);
        }
            
        await onUpdate(product.id, formDataToSend);
        setLoading(false);
    };

    return (
        <div className='fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4'>
            <div className='bg-[#1a1f2b] border border-white/10 rounded-2xl w-full max-w-md p-6 max-h-[90vh] overflow-y-auto shadow-2xl'>
                {/* Заголовок */}
                <div className='flex justify-between items-center mb-5'>
                    <h2 className='text-xl font-bold text-white'>Редактировать товар</h2>
                    <button onClick={onClose} className='text-gray-400 hover:text-white transition p-1.5 hover:bg-white/10 rounded-lg'>
                        <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    {/* Изображение */}
                    <div className='mb-4'>
                        <label className='block text-gray-300 text-sm font-medium mb-2'>Изображение</label>
                        <div className='relative w-32 h-32 mb-3 rounded-xl overflow-hidden bg-white/5 border border-white/10'>
                            {previewUrl ? (
                                <img 
                                    src={previewUrl} 
                                    alt="Preview" 
                                    className='w-full h-full object-cover'
                                />
                            ) : (
                                <div className='w-full h-full flex items-center justify-center text-gray-600'>
                                    <svg className='w-8 h-8' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' />
                                    </svg>
                                </div>
                            )}
                        </div>
                        
                        {/* Кнопка выбора файла */}
                        <label className='inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200 cursor-pointer text-sm'>
                            <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12' />
                            </svg>
                            Выберите файл
                            <input
                                type='file'
                                accept='image/*'
                                onChange={handleImageChange}
                                className='hidden'
                            />
                        </label>
                        
                        {product.image_url && !newImage && (
                            <p className='text-xs text-gray-500 mt-1.5'>Текущее изображение</p>
                        )}
                    </div>

                    {/* Название */}
                    <div className='mb-4'>
                        <label className='block text-gray-300 text-sm font-medium mb-2'>Название</label>
                        <input
                            type='text'
                            name='name'
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            className='w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30 transition-all'
                            required
                        />
                    </div>

                    {/* Описание */}
                    <div className='mb-4'>
                        <label className='block text-gray-300 text-sm font-medium mb-2'>Описание</label>
                        <textarea
                            name='description'
                            value={formData.description}
                            onChange={(e) => setFormData({...formData, description: e.target.value})}
                            rows={3}
                            className='w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30 transition-all resize-none'
                            required
                        />
                    </div>

                    {/* Цена */}
                    <div className='mb-5'>
                        <label className='block text-gray-300 text-sm font-medium mb-2'>Цена</label>
                        <input
                            type='number'
                            name='price'
                            value={formData.price}
                            onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value)})}
                            step='0.01'
                            className='w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30 transition-all'
                            required
                        />
                    </div>

                    {/* Кнопки */}
                    <div className='flex gap-3'>
                        <button
                            type='submit'
                            disabled={loading}
                            className='flex-1 bg-amber-500 hover:bg-amber-400 text-white font-medium py-2.5 rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:hover:scale-100'
                        >
                            {loading ? 'Сохранение...' : 'Сохранить'}
                        </button>
                        <button
                            type='button'
                            onClick={onClose}
                            className='flex-1 bg-white/5 border border-white/10 text-gray-300 hover:text-white font-medium py-2.5 rounded-xl hover:bg-white/10 transition-all duration-300'
                        >
                            Отмена
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}


export default EditProductModal