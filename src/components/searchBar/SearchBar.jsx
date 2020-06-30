import React from "react";
import franc from 'franc-min';
import AsyncSelect from 'react-select/async';
import { components } from 'react-select';
import "./SearchBar.css";
import { searchMovies, getTmdbImgPath } from '../../services/api'

const SearchBar = ({ onChange, language }) => {
    return (
        <AsyncSelect
            className="searchBar"
            options={[]}
            styles={customStyles}
            components = { {Option: MenuItem} }
            theme={theme => ({
                ...theme,
                borderRadius: 0,
                colors: {
                  ...theme.colors,
                  primary25: 'rgba(77, 111, 167, 1)'
                },
              })}
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
            placeholder="Search"
            onChange={item => onChange(item.value)}
            optionComponent={(props, data, snapshot, className) => data.value && (
                <button
                    id={data.name}
                    {...props}
                    className={`${className} search-item`}
                    type="button"
                    onClick={() => onChange(data.value)}
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
    console.log(props.getStyles('option', props))
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

const customStyles = {
    control: (provided, state) => ({
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        display: 'flex'
    }),
    menuList: (provided, state) =>({
        ...provided,
        display: state.options.length > 0 ? provided.display : 'none'
    }),
    menu: (provided, state) =>({
        backgroundColor: 'rgba(29, 39, 56, 1)',
        display: state.options.length > 0 ? provided.display : 'none'
    }),
    input: (provided, state) =>({
        ...provided,
        color: 'white'
    }),
    noOptionMessage: (provided, state) => ({
        backgroundColor: 'rgba(0, 0, 0, 0.3)'
    })
};
export default SearchBar;
