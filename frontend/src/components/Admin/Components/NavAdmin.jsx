import React from 'react'
import Container from '../../General/Container'
import { useNavigate } from 'react-router-dom';

function NavAdmin() {
     const navigate = useNavigate();
  
  const handleLogout = () => {
    // Удаляем токен
    localStorage.removeItem('token');
    // Перенаправляем на логин
    navigate('/');
  };

  return (
    <nav className='h-full w-full border-b border-white/10 shadow-sm md:h-16 md:bg-gray-900/80 md:backdrop-blur-md'>
        <Container className='flex justify-between items-center px-2 py-2'>
            <img className='h-full w-auto' src='/logo.png'></img>
            <button 
                onClick={handleLogout} 
                className="bg-red-500/90 hover:bg-red-500 text-white font-medium px-5 py-2 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-lg hover:shadow-red-500/25 flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Выйти
              </button>
            
        </Container>

    </nav>
  )
}

export default NavAdmin
