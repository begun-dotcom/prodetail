import React from 'react';

import  Container  from '../General/Container';
import { CreditCard, Truck, Clock, MapPin, Phone, Shield, Info } from 'lucide-react';

function PaymentsMain() {
  return (
    <div className='w-full mt-12 md:mt-16 min-h-screen relative bg-linear-to-br from-gray-900 via-gray-800 to-gray-900'>
      {/* Текстурный слой */}
      <div 
        className='absolute inset-0 opacity-[0.03]'
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 0.5px, transparent 0.5px)',
          backgroundSize: '15px 15px'
        }}
      />
      <div className='absolute inset-0 bg-linear-to-br from-white/1 via-transparent to-white/2' />
      
      <Container className='relative z-10 py-8 md:py-12 px-2'>
        
        {/* Заголовок */}
        <div className='text-center mb-8 md:mb-12'>
          <h1 className='text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4'>
            Оплата <span className='text-amber-500'>и доставка</span>
          </h1>
          <p className='text-gray-400 text-base md:text-lg max-w-2xl mx-auto'>
            Мы работаем напрямую — без посредников и лишних сложностей
          </p>
        </div>

        {/* Основная информация */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8 md:mb-10'>
          
          {/* Оплата */}
          <div className='bg-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/10'>
            <div className='w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center mb-4'>
              <CreditCard className='w-6 h-6 text-amber-500' />
            </div>
            <h2 className='text-xl md:text-2xl font-bold text-white mb-4'>Оплата</h2>
            <ul className='space-y-3 text-gray-300'>
              <li className='flex items-start gap-2'>
                <span className='text-amber-500 mt-1'>•</span>
                <span>Оплата наличными при получении</span>
              </li>
              <li className='flex items-start gap-2'>
                <span className='text-amber-500 mt-1'>•</span>
                <span>Оплата по QR-коду (СБП)</span>
              </li>
              <li className='flex items-start gap-2'>
                <span className='text-amber-500 mt-1'>•</span>
                <span>Перевод на банковскую карту</span>
              </li>
              <li className='flex items-start gap-2'>
                <span className='text-amber-500 mt-1'>•</span>
                <span>Предоплата 50% при заказе</span>
              </li>
            </ul>
          </div>

          {/* Доставка */}
          <div className='bg-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/10'>
            <div className='w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center mb-4'>
              <Truck className='w-6 h-6 text-amber-500' />
            </div>
            <h2 className='text-xl md:text-2xl font-bold text-white mb-4'>Доставка</h2>
            <ul className='space-y-3 text-gray-300'>
              <li className='flex items-start gap-2'>
                <span className='text-amber-500 mt-1'>•</span>
                <span>Самовывоз из магазина в с. Первомайское</span>
              </li>
              <li className='flex items-start gap-2'>
                <span className='text-amber-500 mt-1'>•</span>
                <span>Доставка по району — договорная</span>
              </li>
              <li className='flex items-start gap-2'>
                <span className='text-amber-500 mt-1'>•</span>
                <span>Отправка транспортной компанией</span>
              </li>
              <li className='flex items-start gap-2'>
                <span className='text-amber-500 mt-1'>•</span>
                <span>Сроки доставки уточняйте по телефону</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Дополнительная информация */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-10'>
          
          <div className='bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 text-center'>
            <Clock className='w-8 h-8 text-amber-500 mx-auto mb-3' />
            <h3 className='text-white font-semibold mb-2'>Режим работы</h3>
            <p className='text-gray-400 text-sm'>Пн-Вс: 9:00 - 18:00</p>
          </div>

          <div className='bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 text-center'>
            <Shield className='w-8 h-8 text-amber-500 mx-auto mb-3' />
            <h3 className='text-white font-semibold mb-2'>Гарантия</h3>
            <p className='text-gray-400 text-sm'>Обмен и возврат в течение 14 дней</p>
          </div>

          <div className='bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 text-center'>
            <Info className='w-8 h-8 text-amber-500 mx-auto mb-3' />
            <h3 className='text-white font-semibold mb-2'>Уточняйте</h3>
            <p className='text-gray-400 text-sm'>Наличие и цены по телефону</p>
          </div>

        </div>

        {/* Контакты */}
        <div className='bg-amber-500/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-amber-500/20 text-center'>
          <h2 className='text-xl md:text-2xl font-bold text-white mb-4'>Остались вопросы?</h2>
          <p className='text-gray-300 mb-6'>Позвоните нам или приезжайте — всё расскажем!</p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
            <a 
              href='tel:89009216688' 
              className='inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105'
            >
              <Phone className='w-5 h-5' />
              8-900-921-66-88
            </a>
            <div className='flex items-center gap-2 text-gray-300'>
              <MapPin className='w-5 h-5 text-amber-500' />
              <span>636930, Томская область, Первомайский район, <br />
                    село Первомайское, переулок Стадионный 6-2а</span>
            </div>
          </div>
        </div>

      </Container>
    </div>
  );
}

export default PaymentsMain;