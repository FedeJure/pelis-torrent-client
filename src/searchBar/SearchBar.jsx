import React from "react";
import franc from 'franc-min';
import AsyncSelect from 'react-select/async';
import { components } from 'react-select';
import "./SearchBar.css";
import { searchMovies, getTmdbImgPath } from '../api'

const SearchBar = ({ onChange, language }) => {
    return (
        <AsyncSelect
            className="searchBar"
            options={[]}
            components = { {Option: MenuItem} }
            loadOptions={query => {
                return new Promise(async (resolve, reject) => {
                    console.log(franc(query))
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
            placeholder="Movie to search"
            onChange={item => onChange(item.value)}
            optionComponent={(props, data, snapshot, className) => data.value && (
                <button
                    id={data.name}
                    {...props}
                    className={`${className} search-item`}
                    type="button"
                >
                    <div>
                        <img src={data.image ? getTmdbImgPath(data.image) : "./missing-file.png"} />
                    </div>
                    <div className="search-item-description-container">
                        <a>{data.name}</a>
                        <div className="search-item-description">
                            <span>
                                {data.vote}
                                <img className="rating-star" src="./star.png" />
                            </span>

                            <span>{data.date}</span>
                        </div>
                    </div>
                </button>
            )}
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
