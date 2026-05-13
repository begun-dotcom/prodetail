import React from 'react'
import NavAdmin from './Components/NavAdmin'
import MainAdmin from './Components/MainAdmin'


function Admin() {
  return (
      <>
      <header className='sticky top-0 left-0 h-12 w-full z-100 md:h-16'>
          <NavAdmin/>
      </header>
      <main>
          <MainAdmin/>
      </main>
    
      
    </>
  )
}

export default Admin
