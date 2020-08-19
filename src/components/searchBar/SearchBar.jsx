import React , { useState, useEffect } from "react";
import { components } from 'react-select';
import "./SearchBar.css";
import { searchMovies, getTmdbImgPath } from '../../services/api'
import DropdownInput from '../dropdownInput/DropdownInput'
import SelectionButton from '../selectionButton/SelectionButton'


const SearchBar = ({ onChange, language }) => {
    return (
            <DropdownInput
            className="searchBar"
            async
            options={[]}
            components = { {Option: MenuItem} }
            loadOptions={query => {
                return new Promise(async (resolve, reject) => {
                    const { results } = await searchMovies(query, language);
                    const contents = results.map(
                        ({
                            title,
                            vote_average,
                            release_date,
                            poster_path,
                            id,
                            type
                        }) => ({
                                label: title,
                                value: id.toString(),
                                date: release_date,
                                vote: vote_average,
                                image: poster_path,
                                name: title,
                                type: type
                            })
                    );
                    resolve(contents)
                });
            }}
            search
            cacheOptions
            placeholder="Search"
            onChange={item => onChange(item)}
        />
    );
};

const MenuItem = props => {
    const data = props.data;
    return (
        <components.Option id={data.name} {...props}>
            <div className="search-item">
            <div>
                <img src={data.image ? getTmdbImgPath(data.image) : process.env.PUBLIC_URL+"/missing-file.png"} />
            </div>
            <div className="search-item-container">
                <p className="search-item-title">{data.name}</p>
                <div className="search-item-description">
                    <span className="rating">
                        {data.vote}
                        <img className="rating-star" src={process.env.PUBLIC_URL+"/star.png"} />
                    </span>
                    <span className="date">{data.date}</span>
                    <span className="contentType">{data.type.charAt(0).toUpperCase()+data.type.slice(1,data.type.length)}</span>
                </div>
            </div>
            </div>
        </components.Option>
    );
};

export default SearchBar;
