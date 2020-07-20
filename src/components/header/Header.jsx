import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useHistory } from "react-router-dom";
import SearchBar from "../../components/searchBar/SearchBar";
import Logo from "../../components/logo/Logo";
import { getImdbId, getMovieCompleteData, getSupportedLanguages } from '../../services/api';
import { getMovieDto } from '../../domain/movie';
import Routes from "../../services/router";
import MoviesRepository from "../../repositories/moviesRepository";
import LanguagesRepository from "../../repositories/languagesRepository";
import './Header.css'

const Header = () => {
  const [language, setLanguage] = useState('en-US');
  const [languages, setLanguages] = useState([]);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const history = useHistory();
  const isTabletOrMobile = useMediaQuery({ query: '(min-width: 960px)' })

    useEffect(() => {
        const lang = LanguagesRepository.getLanguages();
        if (lang.length > 0) setLanguages(lang);
        else getSupportedLanguages()
        .then(res => {
            const mapped = res.map(item =>({value: item.iso_639_1, label: item.name || item.english_name}));
            const filteredLanguages = mapped.slice(1, mapped.length);
            setLanguages(filteredLanguages);
            LanguagesRepository.saveLanguages(filteredLanguages);
        });
    }, []);
    const onSelectMovie = movie => {
        MoviesRepository.saveMovie(movie);
        history.push(Routes.getMovieUrl(movie.imdbCode));
        window.location.reload();
    }

    const onChange = async movieId => {
        if (!movieId) return;
        const { imdb_id } = await getImdbId(movieId);
        const { data } = await getMovieCompleteData(imdb_id);
        if (data.movies && data.movies.length > 0)
        onSelectMovie(getMovieDto(data.movies[0]));
    };

    const onSelectLanguage = selected => {
        setLanguage(selected.value);
    };

    return (<div className="headerContainer">
                {isTabletOrMobile ? <>
                <Logo />
                <SearchBar onChange={onChange} language={language} onSelectLanguage={onSelectLanguage} languages={languages}/>
                </>
                : <>
                <Logo />
                {showSearchBar && <SearchBar onChange={onChange} language={language} onSelectLanguage={onSelectLanguage} languages={languages}/>}                
                <img className="searchButton" src={process.env.PUBLIC_URL + "/search.svg"} alt="Search" onClick={() => setShowSearchBar(!showSearchBar)}/>
                </>}
            </div>);
};

export default Header;