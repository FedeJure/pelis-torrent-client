import React from "react";
import { components } from 'react-select';
import "./SearchBar.css";
import { searchMovies, getTmdbImgPath } from '../../services/api'
import DropdownInput from '../dropdownInput/DropdownInput'

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
                    const movie = results.map(
                        ({
                            title,
                            vote_average,
                            release_date,
                            poster_path,
                            id
                        }) => {
                            return {
                                label: title,
                                value: id.toString(),
                                date: release_date,
                                vote: vote_average,
                                image: poster_path,
                                name: title
                            };
                        }
                    );
                    resolve(movie)
                });
            }}
            search
            cacheOptions
            placeholder="Search"
            onChange={item => onChange(item.value)}
        />
    );
};

const MenuItem = props => {
    const data = props.data;
    return (
        <components.Option id={data.name} {...props}>
            <div className="search-item">
            <div>
                <img src={data.image ? getTmdbImgPath(data.image) : "./missing-file.png"} />
            </div>
            <div className="search-item-container">
                <p className="search-item-title">{data.name}</p>
                <div className="search-item-description">
                    <span>
                        {data.vote}
                        <img className="rating-star" src="./star.png" />
                    </span>

                    <span>{data.date}</span>
                </div>
            </div>
            </div>
        </components.Option>
    );
};

export default SearchBar;
