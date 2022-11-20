import React from "react";
import logo from './../../../asset/images/logo-removebg.png';
import { Link } from 'react-router-dom';

const HeaderSearch = () => {
  return (
    <div className="search-bar-div small-4">
      <div data-react-class="search/NavSearch" data-react-props="{}">
        <div className="nav-search">
          <div className="search-bar grid-x">
            <div className="cell small-12">
              <div className="search-query input-group">
                <Link to={'/'}>
                  <img src={logo} width={100} alt="" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeaderSearch;