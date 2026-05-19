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
              {<img 
                  className='w-full h-auto object-cover' 
                  src='/screen.jpg' 
                  alt='screen'
                  width="2400"
                  height="1800"
                  loading="eager"
                  fetchPriority="high"
                  style={{ aspectRatio: '2400/1800', minHeight: '400px' }}
                />}
              
              {/* Затемнение сверху */}
              <div className='absolute inset-0 bg-linear-to-b from-[#18202a]/30 via-transparent to-[#18202a]/30 z-10'></div>
              
              {/* Затемнение снизу */}
              <div className='absolute inset-0 bg-linear-to-b from-[#18202a]/30 via-transparent to-[#18202a]/30 z-10'></div>
              
              {/* Контент */}
              <div className=" absolute top-[15%] sm:top-[10%] md:top-[10%] lg:top-[18%] left-0 w-full z-20 flex-col items-center justify-center">
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
                        <div className="hidden sm:block w-full max-w-250 mx-auto px-4 md:px-10">
  
                            {/* Первый ряд */}
                            <div className="flex justify-center md:justify-between gap-6 md:gap-8 lg:gap-12 mb-6 md:mb-8">

                              {/* Запчасти */}
                              <Link 
                                to="/category/spare" 
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
                                  Автозапчасти
                                </span>
                              </Link>

                              {/* Питбайки */}
                              <Link 
                                to="/category/moto" 
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
                                  Мототехника
                                </span>
                              </Link>

                              {/* Электровелосипеды */}
                              <Link 
                                to="/category/electro" 
                                className="group flex flex-col items-center cursor-pointer transition-all duration-300 hover:scale-105"
                              >
                                <div className="w-22 h-22 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center transition-all duration-300 group-hover:shadow-xl group-hover:shadow-amber-500/20 group-hover:bg-white/15 group-hover:border-amber-500/30">
                                  <img 
                                    className='w-20 h-20 md:w-28 md:h-28 lg:w-36 lg:h-36 object-contain transition-transform duration-300 group-hover:scale-110 drop-shadow-lg' 
                                    src='/velo_ico.png' 
                                    alt='bike'
                                  />
                                </div>
                                <span className="mt-4 text-base md:text-lg lg:text-xl font-semibold text-white/90 group-hover:text-white transition-colors duration-300">
                                  Электротехника
                                </span>
                              </Link>

                              

                            </div>

                            {/* Второй ряд */}
                            <div className="flex justify-center md:justify-between gap-6 md:gap-8 lg:gap-12">
                              
                              {/* Квадроциклы */}
                              <Link 
                                to="/category/quadro" 
                                className="group flex flex-col items-center cursor-pointer transition-all duration-300 hover:scale-105"
                              >
                                <div className="w-22 h-22 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center transition-all duration-300 group-hover:shadow-xl group-hover:shadow-amber-500/20 group-hover:bg-white/15 group-hover:border-amber-500/30">
                                  <img 
                                    className='w-20 h-20 md:w-28 md:h-28 lg:w-36 lg:h-36 object-contain transition-transform duration-300 group-hover:scale-110 drop-shadow-lg' 
                                    src='/quatro.webp' 
                                    alt='quadro'
                                  />
                                </div>
                                <span className="mt-4 text-base md:text-lg lg:text-xl font-semibold text-white/90 group-hover:text-white transition-colors duration-300">
                                  Квадроциклы
                                </span>
                              </Link>

                              <Link 
                                to="/category/computer" 
                                className="group flex flex-col items-center cursor-pointer transition-all duration-300 hover:scale-105"
                              >
                                <div className="w-22 h-22 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center transition-all duration-300 group-hover:shadow-xl group-hover:shadow-amber-500/20 group-hover:bg-white/15 group-hover:border-amber-500/30">
                                  <img 
                                    className='w-20 h-20 md:w-28 md:h-28 lg:w-36 lg:h-36 object-contain transition-transform duration-300 group-hover:scale-110 drop-shadow-lg' 
                                    src='/comp.webp' 
                                    alt='computer'
                                  />
                                </div>
                                <span className="mt-4 text-base md:text-lg lg:text-xl font-semibold text-white/90 group-hover:text-white transition-colors duration-300">
                                  Компьютеры
                                </span>
                              </Link>

                              {/* Автосервис */}
                              <Link 
                                to="/category/service" 
                                className="group flex flex-col items-center cursor-pointer transition-all duration-300 hover:scale-105"
                              >
                                <div className="w-22 h-22 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center transition-all duration-300 group-hover:shadow-xl group-hover:shadow-amber-500/20 group-hover:bg-white/15 group-hover:border-amber-500/30">
                                  <img 
                                    className='w-20 h-20 md:w-28 md:h-28 lg:w-36 lg:h-36 object-contain transition-transform duration-300 group-hover:scale-110 drop-shadow-lg' 
                                    src='/service_ico.png' 
                                    alt='service'
                                  />
                                </div>
                                <span className="mt-4 text-base md:text-lg lg:text-xl font-semibold text-white/90 group-hover:text-white transition-colors duration-300">
                                  Автосервис
                                </span>
                              </Link>

                              {/* Компьютеры */}
                              

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
