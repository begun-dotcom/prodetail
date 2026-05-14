import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Container from './Container'
import { FiMenu, FiX  } from 'react-icons/fi';

function NavComponent() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };
  console.log(isOpen)

  /* bg-gray-900/80 */
  return (
    <nav className='fixed h-12 w-full top-0 z-50 border-b border-white/10 shadow-sm md:h-16 md:bg-amber-500 md:backdrop-blur-md'>
  <Container className='flex justify-center items-center px-2 py-2'>
    <div className="w-full h-full flex justify-between items-center px-4">
      {/* Логотип — с белым фильтром чтобы был виден */}
      <Link to="/" className="h-full">
        <img 
          className='h-full w-auto transition-transform duration-300 hover:scale-105 drop-shadow-lg' 
          src='/logo.png' 
          alt='Logo'
        />
      </Link>
      
      {/* Десктопное меню */}
      <div className="hidden md:flex items-center gap-2">
        <Link 
          to="/" 
          className="relative px-4 py-2 text-white/80 hover:text-white transition-all duration-300 font-medium text-lg lg:text-xl rounded-xl hover:bg-white/5 group"
        >
          Главная
          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-amber-500 rounded-full transition-all duration-300 group-hover:w-3/4"></span>
        </Link>
        
        <Link 
          to="/category/Питбайки" 
          className="relative px-4 py-2 text-white/80 hover:text-white transition-all duration-300 font-medium text-lg lg:text-xl rounded-xl hover:bg-white/5 group"
        >
          Каталог
          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-amber-500 rounded-full transition-all duration-300 group-hover:w-3/4"></span>
        </Link>
        
        <Link 
          to="/about" 
          className="relative px-4 py-2 text-white/80 hover:text-white transition-all duration-300 font-medium text-lg lg:text-xl rounded-xl hover:bg-white/5 group"
        >
          О нас
          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-amber-500 rounded-full transition-all duration-300 group-hover:w-3/4"></span>
        </Link>
      </div>
      
      {/* Бургер-кнопка для мобильных */}
      <button 
        className='h-full w-auto transition-all duration-300 hover:scale-105 active:scale-95 md:hidden p-1.5 rounded-lg hover:bg-white/10'
        onClick={toggleMenu}
      >
        <FiMenu className='h-full w-auto text-white drop-shadow-md'/>
      </button>
    </div>
  </Container>

  {/* Оверлей */}
  <div 
  className={`fixed inset-0 bg-black/50 z-100 transition-all duration-300 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
  onClick={closeMenu}
></div>
  
  {/* Мобильное меню */}
 
<div className={`fixed top-0 right-0 w-full max-w-md h-screen bg-white z-100 shadow-2xl transition-transform duration-300 flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
    
    {/* Шапка мобильного меню */}
    <div className='h-12 w-full border-b border-gray-100 bg-white shrink-0 md:h-16'>
      <div className="w-full h-full flex justify-between items-center px-4">
        <img className='h-10 w-auto' src='/logo.png' alt='logo' />
        <button 
          onClick={toggleMenu}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>

    {/* Список пунктов меню — скроллится только если не влезает */}
    <nav className="flex-1">
      <div className="py-2 md:bg-white">
        <Link 
          to="/" 
          onClick={closeMenu}
          className="block px-6 py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors"
        >
          <span className="text-lg font-medium text-gray-800">🏠 Главная</span>
        </Link>
        
        <Link 
          to="/category/Питбайки" 
          onClick={closeMenu}
          className="block px-6 py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors"
        >
          <span className="text-lg font-medium text-gray-800">🏍️ Каталог</span>
        </Link>
        
        {/* Подкатегории — компактнее */}
        <Link 
          to="/category/Питбайки" 
          onClick={closeMenu}
          className="block pl-10 pr-6 py-2.5 border-b border-gray-50 hover:bg-gray-50 transition-colors"
        >
          <span className="text-sm text-gray-600">Питбайки</span>
        </Link>
        
        <Link 
          to="/category/Электровелосипеды" 
          onClick={closeMenu}
          className="block pl-10 pr-6 py-2.5 border-b border-gray-50 hover:bg-gray-50 transition-colors"
        >
          <span className="text-sm text-gray-600">Электровелосипеды</span>
        </Link>
        
        <Link 
          to="/category/Запчасти" 
          onClick={closeMenu}
          className="block pl-10 pr-6 py-2.5 border-b border-gray-50 hover:bg-gray-50 transition-colors"
        >
          <span className="text-sm text-gray-600">Запчасти</span>
        </Link>
        
        <Link 
          to="/about" 
          onClick={closeMenu}
          className="block px-6 py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors"
        >
          <span className="text-lg font-medium text-gray-800">ℹ️ О нас</span>
        </Link>
      </div>
    </nav>
    
    {/* Информация о компании — всегда внизу */}
    <div className="shrink-0 p-4 bg-gray-50 border-t border-gray-200">
      <h3 className="text-sm font-semibold text-gray-800 mb-1">ProДеталь</h3>
      <p className="text-xs text-gray-600 leading-relaxed">
        Запчасти для иностранных и отечественных автомобилей
      </p>
      <p className="text-xs text-gray-500 mt-1.5">
        📍 Томская область, Первомайский район,<br/>
        с. Первомайское, пер. Стадионный 6-2а
      </p>
      <a 
        href="tel:89009216688" 
        className="text-xs text-amber-600 hover:text-amber-700 mt-1 block"
      >
        📞 8-900-921-66-88
      </a>
    </div>
  </div>
</nav>
  )
}

export default NavComponent
