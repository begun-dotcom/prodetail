import React from 'react'
import { useParams } from 'react-router-dom';
import NavComponent from '../General/NavComponent';
import Footer from '../General/Footer';
import MainCategory from './MainComponent/MainCategory';


function Category() {
    const { categoryName } = useParams();

  return (
     <>
      <header className='w-full'>
          <NavComponent/>
      </header>
      <main className=''>
            <MainCategory category={categoryName}/>
      </main>
      <footer className='h-86'>
          <Footer/>
      </footer>
      
    </>
  )
}

export default Category
