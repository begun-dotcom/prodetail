import React from 'react'

function Container({children, className}) {
  return (
    <div className={`w-full h-full md:max-w-425 md:mx-auto ${className}`}>
        {children}
    </div>
  )
}

export default Container
