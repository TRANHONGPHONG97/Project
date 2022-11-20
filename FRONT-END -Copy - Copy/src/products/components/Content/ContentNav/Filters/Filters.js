import React, { useState } from "react";
import ShowFilters from "./ShowFilters";

const Filters = () => {
    const handleShowFilters = () => {
        
        document.getElementById("mySidenav").style.width = "40%";
    };


    return (
       
        <div className="filter-item small cell small-12 medium-4 large-offset-1">
            <div className="filters-bar-div small-3" onClick={handleShowFilters}>
                <div>
                    <div className="nav-search">
                        <div className="search-bar grid-x">
                            <div className="cell small-12">
                                <div className="search-query filter-group">
                                    <button className="search-icon input-group-label off">
                                        <i className="fa-solid fa-filter"></i>
                                        <span className="search-label show-for-large"> Bộ lọc</span>
                                    </button>
                                    <div className="input-group-field off"><input className="search-input off" placeholder="Search for experiences, items, and charities" /></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ShowFilters />
        </div>
    );
}

export default Filters;