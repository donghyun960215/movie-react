import React from 'react';


const Layout = ({ children }) => {
  return(
    <div className="page">
      <div className="page">
        <div className={'layout-wrapper'}>
          <div className={'layout-content-wrapper'}>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Layout;