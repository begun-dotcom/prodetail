import React from 'react'
import Container from './Container'
import { MapPin, Phone, Mail, Clock,} from 'lucide-react';

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <div className='bg-gray-900 text-gray-300 border-t border-white/10 shadow-sm md:h-full'>
        <Container className=''>
              <div className="px-4 py-8 md:py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    
                    {/* Колонка 1: О магазине */}
                    <div>
                        <h3 className="text-xl font-bold text-white mb-4">ProДеталь</h3>
                        <p className="text-sm leading-relaxed">
                            Запчасти для иностранных и отечественных автомобилей. 
                            Широкий ассортимент качественных запчастей по доступным ценам.
                        </p>
                        
                    </div>

                    {/* Колонка 2: Контакты */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Контакты</h3>
                        <div className="space-y-3">
                            <div className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                                <span className="text-sm">
                                    636930, Томская область, Первомайский район, <br />
                                    село Первомайское, переулок Стадионный 6-2а
                                </span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-blue-400" />
                                <a href="tel:89009216688" className="text-sm hover:text-blue-400 transition-colors">
                                    8 (900) 921-66-88
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Колонка 3: Режим работы */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Режим работы</h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span>Пн-Пт:</span>
                                <span className="text-white">10:00 - 18:00</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Суббота:</span>
                                <span className="text-white">10:00 - 15:00</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Воскресенье:</span>
                                <span className="text-white">10:00 - 15:00</span>
                            </div>
                        </div>
                    </div>

                    {/* Колонка 4: Соцсети и копирайт */}
                    <div>
                        
                        <div className="text-sm text-gray-500 text-center">
                            <p>© {currentYear} ProДеталь</p>
                            <p className="mt-1">Все права защищены</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Нижняя полоска с копирайтом */}
            <div className="border-t border-gray-800 py-4">
                <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-500">
                    <p>© {currentYear} ProДеталь — Запчасти для иномарок и отечественных авто</p>
                </div>
            </div>

        </Container>
    </div>
  )
}

export default Footer
