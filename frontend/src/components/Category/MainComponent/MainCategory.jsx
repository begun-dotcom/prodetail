import React from 'react'
import { useState , useEffect} from 'react';
import { Services } from '../../../services/Services';
import Container from '../../General/Container'
import { useQuery , useQueryClient} from '@tanstack/react-query';
import { Search, ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react'; 

function MainCategory({category}) {

  const [activCategiry, setActivCategiry] = useState(category);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  /* const openImageModal = (imageUrl, productName) => {
      setSelectedImage({ url: imageUrl, name: productName });
  }; */
  const openImageModal = (imageUrl, productName, description) => {
  setSelectedImage({ 
    url: imageUrl, 
    name: productName, 
    description: description
  });
};

  const closeImageModal = () => {
      setSelectedImage(null);
  };

  // Сброс страницы при смене категории
 useEffect(() => {
    setCurrentPage(1);
    // Принудительный скролл наверх — работает везде
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
}, [activCategiry]);

const goToPage = (page) => {
    setCurrentPage(page);
    // Принудительный скролл наверх
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
};

  const {data: categoryData = [], isLoading: isLoadingCategories, error: errorCategories } = useQuery({
        queryKey: ['selectCategory'],
        queryFn: async () => await Services.getCategory(),
        staleTime: 5 * 60 * 1000,
        retry: 3,
        refetchOnWindowFocus: true,
    });

  const {data: productsData = [], isLoading: isLoadingProducts, error: errorProducts } = useQuery({
          queryKey: ['categoryName', activCategiry, currentPage],
          queryFn: async () => await Services.getContentForPage(currentPage, itemsPerPage, activCategiry),
          staleTime: 5 * 60 * 1000,
          retry: 3,
          refetchOnWindowFocus: true,
          enabled: !!activCategiry,
          keepPreviousData: true,
      });

  const categories = categoryData?.data || [];
  const products = productsData?.data?.items || [];
  const totalPages = productsData?.data?.pages;

  // Загрузка
  if (isLoadingCategories || isLoadingProducts) {
    return (
      <div className="w-full mt-12 md:mt-16 min-h-screen relative bg-linear-to-br from-[#18202a] to-[#1a1f2b] flex items-center justify-center">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
        <div className="relative z-10 flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-amber-500/30 border-t-amber-500 rounded-full animate-spin" />
          <p className="text-white/60 text-lg">Загрузка...</p>
        </div>
      </div>
    );
  }

  // Ошибка
  if (errorCategories || errorProducts) {
    return (
      <div className="w-full mt-12 md:mt-16 min-h-screen relative bg-linear-to-br from-[#18202a] to-[#1a1f2b] flex items-center justify-center">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
        <div className="relative z-10 bg-red-500/10 border border-red-500/30 rounded-xl p-8 max-w-md mx-4 text-center">
          <p className="text-red-400 text-lg">Ошибка загрузки: {errorCategories?.message || errorProducts?.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className='w-full mt-12 md:mt-16 min-h-screen relative bg-linear-to-br from-gray-900 via-gray-800 to-gray-900'>
      {/* Текстурный слой с серебристыми крапинками */}
      <div 
        className='absolute inset-0 opacity-[0.03]'
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 0.5px, transparent 0.5px)',
          backgroundSize: '15px 15px'
        }}
      />
      
      {/* Лёгкий серебристый отлив */}
      <div className='absolute inset-0 bg-linear-to-br from-white/1 via-transparent to-white/2' />
      
      <Container className='relative z-10 pt-0 min-h-screen px-1'>
        
        {/* Мобильный селект категорий */}
        <div className='block md:hidden sticky top-12 z-40'>
          <div className='bg-white/10 backdrop-blur-md border-b border-white/10 rounded-b-xl overflow-hidden'>
            <select 
              value={activCategiry}
              onChange={(e) => setActivCategiry(e.target.value)}
              className='w-full px-4 py-3 text-base font-medium bg-transparent text-white focus:outline-none appearance-none cursor-pointer'
              style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px center', backgroundSize: '20px' }}
            >
              {categories.map(cat => (
                <option key={cat.id} value={cat.name} className='text-gray-900'>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Десктопные вкладки категорий */}
        <div className='hidden md:block sticky top-16 z-40'>
          <div className='bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden mb-6'>
            <div className='flex overflow-x-auto scrollbar-hide p-2 gap-10 justify-center '>
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActivCategiry(cat.name)}
                  className={`
                    relative px-5 py-2.5 text-base lg:text-lg font-medium rounded-xl whitespace-nowrap
                    transition-all duration-300
                    ${activCategiry === cat.name 
                      ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/25' 
                      : 'text-white/60 hover:text-white hover:bg-white/10'
                    }
                  `}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>
                
        {/* Заголовок категории */}
        <div className='mb-6 mt-4 md:mt-0'>
          <h2 className='text-2xl md:text-3xl font-bold text-white'>
            {activCategiry}
            <span className='text-white/40 text-lg ml-2 font-normal'>
              ({products.length} товаров)
            </span>
          </h2>
        </div>

        {/* Сетка продуктов */}
        {products.length > 0 ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-5 auto-rows-fr'>
            {products.map((product, index) => (
              <div 
                key={product.id}
                className="group bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-amber-500/30 transition-all duration-500 overflow-hidden hover:-translate-y-2 hover:shadow-2xl hover:shadow-amber-500/10 cursor-pointer"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div 
                  className="relative overflow-hidden bg-gray-800/50 aspect-4/3 cursor-zoom-in"
                  onClick={() => openImageModal(product.image_url, product.name, product.description)}
                >
                  {/* onClick={() => openImageModal(product.image_url, product.name)} */}
                  <img 
                    className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110' 
                    src={product.image_url && product.image_url !== '' ? product.image_url : '/notfound.jpg'} 
                    alt={product.name}
                    onError={(e) => { e.target.src = '/notfound.jpg'; }}
                    loading="lazy"
                    width="1920"
                    height="1080"
                  />
                  
                  {/* Оверлей при наведении */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className='flex flex-col items-center gap-2'>
                      <ZoomIn className="w-10 h-10 text-white" />
                      <span className='text-white/80 text-sm'>Нажмите для просмотра</span>
                    </div>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="text-sm md:text-base font-semibold text-white line-clamp-1 group-hover:text-amber-400 transition-colors">
                    {product.name}
                  </h3>
                  
                  <p className="text-xs md:text-sm text-gray-400 mt-1.5 line-clamp-2 h-10">
                    {product.description}
                  </p>
                  
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-lg md:text-xl font-bold text-amber-500">
                      {Number(product.price) > 0 
                        ? `${Number(product.price).toLocaleString()} ₽` 
                        : 'Уточняйте цену'
                    }
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Пустой результат */
          <div className='flex flex-col items-center justify-center py-20 text-center'>
            <Search className='w-16 h-16 text-white/20 mb-4' />
            <p className='text-white/40 text-lg'>Товары не найдены</p>
            <p className='text-white/20 text-sm mt-1'>Попробуйте выбрать другую категорию</p>
          </div>
        )}

        {/* Пагинация */}
        {totalPages > 1 && (
          <div className='flex justify-center items-center gap-2 mt-8 pb-10'>
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`
                w-10 h-10 rounded-xl transition-all duration-300 flex items-center justify-center
                ${currentPage === 1 
                  ? 'bg-white/5 text-white/20 cursor-not-allowed' 
                  : 'bg-white/10 text-white hover:bg-amber-500 hover:text-white hover:scale-105'
                }
              `}
            >
              <ChevronLeft className='w-5 h-5' />
            </button>
            
            <div className='flex gap-1.5'>
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                
                return (
                  <button
                    key={pageNum}
                    onClick={() => goToPage(pageNum)}
                    className={`
                      w-10 h-10 rounded-xl transition-all duration-300 text-sm font-medium
                      ${currentPage === pageNum 
                        ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/25 scale-105' 
                        : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                      }
                    `}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>
            
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`
                w-10 h-10 rounded-xl transition-all duration-300 flex items-center justify-center
                ${currentPage === totalPages 
                  ? 'bg-white/5 text-white/20 cursor-not-allowed' 
                  : 'bg-white/10 text-white hover:bg-amber-500 hover:text-white hover:scale-105'
                }
              `}
            >
              <ChevronRight className='w-5 h-5' />
            </button>
          </div>
        )}
      </Container>

      {/* Модалка просмотра изображения */}
      {selectedImage && (
            <div 
              className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn"
              onClick={closeImageModal}
            >
              <div 
                className="relative max-w-2xl w-full animate-scaleIn"
                onClick={(e) => e.stopPropagation()}
              >
                <div className='bg-white/5 border border-white/10 rounded-2xl overflow-hidden flex flex-col max-h-[90vh]'>
                  {/* Фото */}
                  <div className='relative shrink-0 bg-black/50'>
                    <button
                      onClick={closeImageModal}
                      className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full z-10 bg-black/30"
                    >
                      <X className="w-6 h-6" />
                    </button>
                    <img 
                      src={selectedImage.url} 
                      alt={selectedImage.name}
                      className="w-full h-auto max-h-[50vh] object-contain mx-auto"
                    />
                  </div>
                  
                  {/* Описание — скроллится */}
                  <div className='p-6 overflow-y-auto flex-1'>
                    <p className="text-white text-lg font-bold mb-4">
                      {selectedImage.name}
                    </p>
                    
                    {selectedImage.description && (
                      <p className="text-gray-300 text-base leading-relaxed whitespace-pre-wrap wrap-break-word">
                        {selectedImage.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
      {/* {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn"
          onClick={closeImageModal}
        >
          <div 
            className="relative max-w-5xl w-full max-h-[90vh] animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeImageModal}
              className="absolute -top-14 right-0 text-white/60 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
            >
              <X className="w-8 h-8" />
            </button>
            
            <div className='bg-white/5 border border-white/10 rounded-2xl overflow-hidden'>
              <img 
                src={selectedImage.url} 
                alt={selectedImage.name}
                className="w-full h-full object-contain max-h-[80vh]"
              />
              <div className='p-4 border-t border-white/10'>
                <p className="text-white text-lg font-medium text-center">
                  {selectedImage.name}
                </p>
              </div>
            </div>
          </div>
        </div>
      )} */}
    </div>
  )
}

export default MainCategory