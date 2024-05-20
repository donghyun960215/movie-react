import React from 'react';
import { useLocation } from "react-router-dom";

const SideMenu = () => {
  const params = useLocation();

  return  (
    <div className="side-menu-wrapper">
      <ul>
        <li className={params.pathname === "/" ? "active" : ""}>
          <a href={"/"}>검색</a>
        </li>
        <li className={params.pathname === "/about" ? "active" : ""}>
          <a href={"/about"}>내 정보</a>
        </li>
      </ul>
    </div>
  )
}
export default SideMenu;