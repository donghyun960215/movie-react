import React from 'react';
import Header from "./header";
import SideMenu from "./sideMenu";

const Layout = ({ children }) => {
  return(
    <div className="page">
      <div className="page">
        <Header />
        <div className={'layout-wrapper'}>
          <SideMenu/>
          <div className={'layout-content-wrapper'}>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Layout;