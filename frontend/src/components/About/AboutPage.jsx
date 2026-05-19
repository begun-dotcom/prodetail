import React from 'react';
import Container from '../General/Container'
import { MapPin, Phone, Mail, Clock, Shield, ThumbsUp, Users } from 'lucide-react';
import NavComponent from '../General/NavComponent';

function AboutPage() {
  return (
    <div className='w-full mt-0 md:mt-16 bg-[#06141b]'>
      <NavComponent/>
      {/* Hero секция */}
      <div className='relative bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 py-16 md:py-24'>
        
        <Container className='px-2'>
          <div className='text-center relative z-10'>
            <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6'>
              О компании <span className='text-amber-500'>ProДеталь</span>
            </h1>
            <p className='text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed'>
              Ваш надёжный партнёр в мире автозапчастей. Мы помогаем найти идеальные детали 
              для вашего автомобиля.
            </p>
          </div>
        </Container>
      </div>

      <Container className='py-12 px-2 md:py-16'>
        {/* Миссия */}
        <div className='bg-linear-to-r from-amber-500 to-amber-600 rounded-2xl p-8 md:p-12 mb-12 md:mb-16'>
          <div className='flex flex-col md:flex-row items-center gap-8'>
            <div className='shrink-0'>
              <div className='w-20 h-20 bg-white/20 rounded-full flex items-center justify-center'>
                <Shield className='w-10 h-10 text-white' />
              </div>
            </div>
            <div className='text-center md:text-left'>
              <h2 className='text-2xl md:text-3xl font-bold text-white mb-4'>
                Наша миссия
              </h2>
              <p className='text-white/90 text-lg leading-relaxed'>
                Обеспечить каждого автовладельца качественными запчастями по доступным ценам. 
                Мы тщательно отбираем поставщиков и гарантируем подлинность каждой детали.
              </p>
            </div>
          </div>
        </div>

        {/* Преимущества */}
        <div className='mb-12 md:mb-16'>
          <h2 className='text-3xl md:text-4xl font-bold text-white text-center mb-12'>
            Почему выбирают <span className='text-amber-500'>нас</span>
          </h2>
          
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8'>
            {/* Преимущество 1 */}
            <div className='bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:border-amber-500/50 transition-all duration-300 group hover:-translate-y-2'>
              <div className='w-16 h-16 bg-amber-500/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-amber-500/20 transition-colors'>
                <ThumbsUp className='w-8 h-8 text-amber-500' />
              </div>
              <h3 className='text-xl font-bold text-white mb-4'>Гарантия качества</h3>
              <p className='text-gray-400 leading-relaxed'>
                Все запчасти проходят строгий контроль качества. Мы работаем только с проверенными производителями.
              </p>
            </div>

            {/* Преимущество 2 */}
            <div className='bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:border-amber-500/50 transition-all duration-300 group hover:-translate-y-2'>
              <div className='w-16 h-16 bg-amber-500/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-amber-500/20 transition-colors'>
                <Users className='w-8 h-8 text-amber-500' />
              </div>
              <h3 className='text-xl font-bold text-white mb-4'>Экспертная поддержка</h3>
              <p className='text-gray-400 leading-relaxed'>
                Наши специалисты помогут подобрать нужную деталь. 
              </p>
            </div>

            {/* Преимущество 3 */}
            
          </div>
        </div>

        {/* Контакты и адрес */}
        <div className='bg-white/5 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/10'>
          <h2 className='text-3xl md:text-4xl font-bold text-white text-center mb-12'>
            Наши <span className='text-amber-500'>контакты</span>
          </h2>
          
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12'>
            <div className='space-y-6'>
              <div className='flex items-start gap-4'>
                <div className='w-12 h-12 bg-amber-500/10 rounded-lg flex items-center justify-center shrink-0'>
                  <MapPin className='w-6 h-6 text-amber-500' />
                </div>
                <div>
                  <h3 className='text-lg font-semibold text-white mb-1'>Адрес</h3>
                  <p className='text-gray-400 leading-relaxed'>
                    636930, Томская область, Первомайский район,<br />
                    село Первомайское,<br />
                    переулок Стадионный 6-2а
                  </p>
                </div>
              </div>

              <div className='flex items-start gap-4'>
                <div className='w-12 h-12 bg-amber-500/10 rounded-lg flex items-center justify-center shrink-0'>
                  <Phone className='w-6 h-6 text-amber-500' />
                </div>
                <div>
                  <h3 className='text-lg font-semibold text-white mb-1'>Телефон</h3>
                  <a 
                    href='tel:89009216688' 
                    className='text-amber-500 hover:text-amber-400 text-xl font-semibold transition-colors'
                  >
                    8-900-921-66-88
                  </a>
                </div>
              </div>

            </div>

            {/* Карта или изображение */}
            <div className='bg-gray-800 rounded-xl h-64 md:h-full min-h-75 overflow-hidden border border-white/10'>
                <iframe 
                  src="https://yandex.ru/map-widget/v1/?ll=86.229320%2C57.067204&z=16&pt=86.229320,57.067204,pm2rdl&size=650,450"
                  width="100%" 
                  height="100%" 
                  frameBorder="0"
                  allowFullScreen
                  className="border-0"
                  title="Карта проезда"
                />
              </div>
          </div>
        </div>

        {/* CTA секция */}
        <div className='text-center mt-12 md:mt-16'>
          <h3 className='text-2xl md:text-3xl font-bold text-white mb-6'>
            Готовы найти нужную <span className='text-amber-500'>запчасть</span>?
          </h3>
          <p className='text-gray-400 text-lg mb-8 max-w-2xl mx-auto'>
            Свяжитесь с нами или посетите наш магазин. Мы всегда рады помочь!
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <a 
              href='tel:89009216688' 
              className='inline-flex items-center justify-center gap-2 px-8 py-4 bg-amber-500 text-white font-semibold rounded-xl hover:bg-amber-600 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-amber-500/25'
            >
              <Phone className='w-5 h-5' />
              Позвонить
            </a>
            <a 
              href='/category/Питбайки' 
              className='inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300 hover:scale-105 border border-white/10'
            >
              Перейти в каталог
            </a>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default AboutPage;