import React from 'react';
import '../style/SearchBar.css'

const SearchBar = (props) => {
    return (
        <div style={{ width: props.barWidth }} className="searchBar">

            <svg className="searchIcon" width='18' viewBox="0 0 18 18">
                <path d="M18 16.5l-5.14-5.18h-.35a7 7 0 1 0-1.19 1.19v.35L16.5 18l1.5-1.5zM12 7A5 5 0 1 1 2 7a5 5 0 0 1 10 0z">
                </path>
            </svg>

            <input style={{ width: props.boxWidth }} placeholder="Search..." className="searchBox" type="text"></input>

        </div>
    )
}

export default SearchBar;