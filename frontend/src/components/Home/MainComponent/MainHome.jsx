import React from 'react'
import Container from '../../General/Container'
import { Link } from 'react-router-dom';

function MainHome() {
  return (
    <div className='w-full relative '>
      <Container className='relative z-10 pt-0 pb-0 px-0.5'>
        
        {/* Два фото */}
        <div className='w-full'>
  {/* Заголовок */}
  <div className='text-center mb-6 md:mb-8'>
    <h2 className='text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2'>
      В наличии <span className='text-amber-500'>и под заказ</span>
    </h2>
    
  </div>

  {/* Три фото */}
  <div className='w-full grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 gap-4 md:gap-5 pb-8 md:pb-10'>
    
    {/* Запчасти */}
    

    {/* Питбайки */}
    <Link to="/category/Питбайки" className='relative group overflow-hidden rounded-2xl border border-white/5 hover:border-amber-500/20 transition-all duration-500 hover:shadow-xl hover:shadow-amber-500/5 cursor-pointer'>
      <img 
        className='w-full h-48 md:h-56 lg:h-70 object-cover transition-transform duration-700 group-hover:scale-105' 
        src='/mot.webp' 
        alt='Питбайки'
      />
      <div className='absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent' />
      <div className='absolute inset-0 bg-linear-to-t from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500' />
      <div className='absolute bottom-0 left-0 right-0 p-4 md:p-5'>
        <h3 className='text-white font-semibold text-lg md:text-xl'>Питбайки</h3>
        <p className='text-gray-300 text-sm mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>Мотоциклы и запчасти</p>
      </div>
    </Link>

    {/* Электровелосипеды */}
    <Link to="/category/Электровелосипеды" className='relative group overflow-hidden rounded-2xl border border-white/5 hover:border-amber-500/20 transition-all duration-500 hover:shadow-xl hover:shadow-amber-500/5 cursor-pointer'>
      <img 
        className='w-full h-48 md:h-56 lg:h-70 object-cover transition-transform duration-700 group-hover:scale-105' 
        src='/mot2.webp' 
        alt='Электровелосипеды'
      />
      <div className='absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent' />
      <div className='absolute inset-0 bg-linear-to-t from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500' />
      <div className='absolute bottom-0 left-0 right-0 p-4 md:p-5'>
        <h3 className='text-white font-semibold text-lg md:text-xl'>Электровелосипеды</h3>
        <p className='text-gray-300 text-sm mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>В наличии и под заказ</p>
      </div>
    </Link>
    <Link to="/category/Запчасти" className='relative group overflow-hidden rounded-2xl border border-white/5 hover:border-amber-500/20 transition-all duration-500 hover:shadow-xl hover:shadow-amber-500/5 cursor-pointer'>
      <img 
        className='w-full h-48 md:h-56 lg:h-70 object-cover transition-transform duration-700 group-hover:scale-105' 
        src='/запчасти.webp' 
        alt='Запчасти'
      />
      <div className='absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent' />
      <div className='absolute inset-0 bg-linear-to-t from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500' />
      <div className='absolute bottom-0 left-0 right-0 p-4 md:p-5'>
        <h3 className='text-white font-semibold text-lg md:text-xl'>Запчасти</h3>
        <p className='text-gray-300 text-sm mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>Для мотоциклов и авто</p>
      </div>
    </Link>
  </div>
</div>

        {/* Три преимущества */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 pb-8 md:pb-10'>
          <div className='bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-amber-500/20 transition-all duration-300 group hover:-translate-y-1'>
            <div className='w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-amber-500/20 transition-colors'>
              <svg className='w-6 h-6 text-amber-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' />
              </svg>
            </div>
            <h3 className='text-white font-semibold text-lg mb-2'>Гарантия качества</h3>
            <p className='text-gray-400 text-sm leading-relaxed'>
              Все запчасти проходят строгий контроль. Работаем только с проверенными производителями.
            </p>
          </div>

          <div className='bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-amber-500/20 transition-all duration-300 group hover:-translate-y-1'>
            <div className='w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-amber-500/20 transition-colors'>
              <svg className='w-6 h-6 text-amber-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 10V3L4 14h7v7l9-11h-7z' />
              </svg>
            </div>
            <h3 className='text-white font-semibold text-lg mb-2'>Доступные запчасти</h3>
            <p className='text-gray-400 text-sm leading-relaxed'>
              Всегда в наличии популярные запчасти. Привезём под заказ то, чего нет на складе.
            </p>
          </div>

          <div className='bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-amber-500/20 transition-all duration-300 group hover:-translate-y-1'>
            <div className='w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-amber-500/20 transition-colors'>
              <svg className='w-6 h-6 text-amber-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z' />
              </svg>
            </div>
            <h3 className='text-white font-semibold text-lg mb-2'>Экспертная помощь</h3>
            <p className='text-gray-400 text-sm leading-relaxed'>
              Поможем подобрать нужную деталь. Консультация специалистов с опытом от 5 лет.
            </p>
          </div>
        </div>

      </Container>
    </div>
  )
}

export default MainHome
