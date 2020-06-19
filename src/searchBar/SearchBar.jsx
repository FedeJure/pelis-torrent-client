import React from "react";
import SelectSearch from "react-select-search";
import "./SearchBar.css";
import { searchMovies, getTmdbImgPath } from '../api'

const SearchBar = ({ onChange, language }) => {
    return (
        <SelectSearch
            options={[]}
            getOptions={query => {
                return new Promise(async (resolve, reject) => {
                    console.log("asdasd")
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
            placeholder="Torrent to search"
            onChange={onChange}
            printOptions="on-focus"
            renderOption={(props, data, snapshot, className) => data.value && (
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

export default SearchBar;
