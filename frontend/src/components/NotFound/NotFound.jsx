import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#18202a] to-[#1a1f2b]">
      <div className="text-center px-4">
        <h1 className="text-8xl md:text-9xl font-bold text-amber-500 mb-4">404</h1>
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Страница не найдена</h2>
        <p className="text-gray-400 mb-8 max-w-md mx-auto">
          Запрашиваемая страница не существует или была перемещена.
        </p>
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          На главную
        </Link>
      </div>
    </div>
  );
}

export default NotFound;