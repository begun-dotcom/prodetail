import React from 'react'
import { Link } from 'react-router-dom';
import NavComponent from '../../General/NavComponent'
import Container from '../../General/Container'

function HeaderHome() {
  return (
    <>
      <NavComponent/>
      <div className='w-full mt-0 md:mt-16 '>
  
  
  <Container className='relative z-10 px-0.5 pt-1 pb-4 md:pt-1 md:pb-6'>
    <div className='relative w-full rounded-2xl overflow-hidden border border-white/5 shadow-2xl shadow-black/20'>
      <img 
        className='w-full h-auto min-h-100 md:min-h-125 lg:min-h-150 object-cover' 
        src='/screen.webp' 
        alt='screen'
      />
      
      {/* Затемнение сверху */}
      <div className='absolute inset-0 bg-linear-to-b from-[#18202a]/30 via-transparent to-[#18202a]/30 z-10'></div>
      
      {/* Затемнение снизу */}
      <div className='absolute inset-0 bg-linear-to-b from-[#18202a]/30 via-transparent to-[#18202a]/30 z-10'></div>
      
      {/* Контент */}
      <div className="absolute top-[28%] md:top-[25%] left-0 w-full z-20 flex flex-col items-center justify-center">
        {/* Заголовок */}
        <div className='text-center px-4 mb-8 md:mb-12'>
          <h1 className='text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-3'>
            <span className='text-amber-500'>Pro</span>Деталь
          </h1>
          <p className='text-sm md:text-base lg:text-lg text-white max-w-xl mx-auto'>
            Запчасти для иностранных и отечественных автомобилей в наличии и под заказ
          </p>
        </div>

        {/* Категории */}
        <div className="w-full max-w-250 mx-auto px-4 md:px-10">
          <div className="flex justify-center md:justify-between gap-6 md:gap-8 lg:gap-12">
            
            {/* Категория 1 - Мотоциклы */}
            <Link 
              to="/category/Питбайки" 
              className="group flex flex-col items-center cursor-pointer transition-all duration-300 hover:scale-105"
            >
              <div className="w-22 h-22 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center transition-all duration-300 group-hover:shadow-xl group-hover:shadow-amber-500/20 group-hover:bg-white/15 group-hover:border-amber-500/30">
                <img 
                  className='w-20 h-20 md:w-28 md:h-28 lg:w-36 lg:h-36 object-contain transition-transform duration-300 group-hover:scale-110 drop-shadow-lg' 
                  src='/moto.png' 
                  alt='moto'
                />
              </div>
              <span className="mt-4 text-base md:text-lg lg:text-xl font-semibold text-white/90 group-hover:text-white transition-colors duration-300">
                Питбайки
              </span>
            </Link>

            {/* Категория 2 - Электровелосипеды */}
            <Link 
              to="/category/Электровелосипеды" 
              className="group flex flex-col items-center cursor-pointer transition-all duration-300 hover:scale-105"
            >
              <div className="w-22 h-22 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center transition-all duration-300 group-hover:shadow-xl group-hover:shadow-amber-500/20 group-hover:bg-white/15 group-hover:border-amber-500/30">
                <img 
                  className='w-20 h-20 md:w-28 md:h-28 lg:w-36 lg:h-36 object-contain transition-transform duration-300 group-hover:scale-110 drop-shadow-lg' 
                  src='/velo.png' 
                  alt='bike'
                />
              </div>
              <span className="mt-4 text-base md:text-lg lg:text-xl font-semibold text-white/90 group-hover:text-white transition-colors duration-300">
                Электровелосипеды
              </span>
            </Link>

            {/* Категория 3 - Запчасти */}
            <Link 
              to="/category/Запчасти" 
              className="group flex flex-col items-center cursor-pointer transition-all duration-300 hover:scale-105"
            >
              <div className="w-22 h-22 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center transition-all duration-300 group-hover:shadow-xl group-hover:shadow-amber-500/20 group-hover:bg-white/15 group-hover:border-amber-500/30">
                <img 
                  className='w-20 h-20 md:w-28 md:h-28 lg:w-36 lg:h-36 object-contain transition-transform duration-300 group-hover:scale-110 drop-shadow-lg' 
                  src='/remo.png' 
                  alt='parts'
                />
              </div>
              <span className="mt-4 text-base md:text-lg lg:text-xl font-semibold text-white/90 group-hover:text-white transition-colors duration-300">
                Запчасти
              </span>
            </Link>

          </div>
        </div>
      </div>
    </div>
  
  </Container>
</div>
      


      
      
    </>
  )
}

export default HeaderHome
