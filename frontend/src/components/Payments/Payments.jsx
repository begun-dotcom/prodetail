import React from 'react'
import NavComponent from '../General/NavComponent'
import Footer from '../General/Footer'
import PaymentsMain from './PaymenntsMain'


function Payments() {
  return (
     <>
      <header className='w-full'>
          <NavComponent/>
      </header>
      <main className=''>
            <PaymentsMain/>
      </main>
      <footer className='h-86'>
          <Footer/>
      </footer>
      
    </>
  )
}

export default Payments
