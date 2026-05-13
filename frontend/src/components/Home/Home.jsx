import React from 'react'
import HeaderHome from './HeaderComponent/HeaderHome'
import Footer from '../General/Footer'
import MainHome from './MainComponent/MainHome'


function Home() {
  return (
    <div className='w-full relative bg-linear-to-br from-gray-900 via-gray-800 to-gray-900' style={{ backgroundColor: '#111827' }}>
      {/* Единый текстурный слой на Header + Main */}
      <div 
        className='absolute inset-0 opacity-[0.03] pointer-events-none z-0'
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 0.5px, transparent 0.5px)',
          backgroundSize: '15px 15px',
          bottom: '344px' // высота футера (h-86 ≈ 344px)
        }}
      />
      
      
      <div 
        className='absolute inset-0 bg-linear-to-br from-white/1 via-transparent to-white/2 pointer-events-none z-0'
        style={{ bottom: '344px' }}
      />
      
      <header className='w-full relative '>
        <HeaderHome/>
      </header>
      
      <main className='relative '>
        <MainHome/>
      </main>
      
      <footer className='relative '>
        <Footer/>
      </footer>

      <a 
        href="tel:89009216688" 
        className="fixed bottom-6 right-6 z-100 group flex items-center gap-3 bg-amber-500 hover:bg-amber-400 text-white font-semibold px-5 py-3.5 rounded-full shadow-lg shadow-amber-500/30 hover:shadow-xl hover:shadow-amber-500/40 transition-all duration-300 hover:scale-105 active:scale-95"
      >
        {/* Иконка телефона */}
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
        </span>
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
        <span className="hidden md:inline">8-900-921-66-88</span>
      </a>
    </div>
  )
}

export default Home


