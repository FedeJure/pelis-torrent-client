import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useHistory } from "react-router-dom";
import SearchBar from "../../components/searchBar/SearchBar";
import Logo from "../../components/logo/Logo";
import { getImdbId, getMovieCompleteData, getSupportedLanguages } from '../../services/api';
import { movieFromResponse } from '../../domain/movie';
import Routes from "../../services/router";
import MoviesRepository from "../../repositories/moviesRepository";
import LanguagesRepository from "../../repositories/languagesRepository";
import { getAvailableGenres } from "../../repositories/genresRepository";
import SelectionButton from '../selectionButton/SelectionButton'
import {Genre} from "../../repositories/genresRepository"
import './Header.css'

const Header = ({ isSerie, genre, elements } : {isSerie: boolean, genre: Genre, elements: object[] | null}) => {
    const [language, setLanguage] = useState('en-US');
    const [languages, setLanguages] = useState([]);
    const [showSearchBar, setShowSearchBar] = useState(false);
    const history = useHistory();
    const isDesktop = useMediaQuery({ query: '(min-width: 960px)' })

    const onGenreSelected = (genre: {value: string, label: string}) => {
        if (!genre.value) history.push(Routes.getHomeRoute());
        else history.push(Routes.getHomeRouteWithGenre(genre.value));
        window.location.reload();
    };

    const onTypeSelected = (type: {value: string, label: string}) => {
        if (type.value == 'serie') history.push(Routes.getHomeSeriesRoute());
        else history.push(Routes.getHomeRoute());
        window.location.reload();
    }

    const onSelectMovie = async (movieId: number) => {
        if (!movieId) return;
        const { imdb_id } = await getImdbId(movieId);
        const { data } = await getMovieCompleteData(imdb_id);
        if (data.movies && data.movies.length > 0) {
            const movie = movieFromResponse(data.movies[0]);
            MoviesRepository.saveMovie(movie);
            history.push(Routes.getMovieUrl(movie.imdbCode));
            window.location.reload();
        }
    }

    const onSelectSerie = (serieId: number) => {
        if (!serieId) return;
        history.push(Routes.getSerieUrl(serieId));
        window.location.reload();
    }

    useEffect(() => {
        const lang = LanguagesRepository.getLanguages();
        if (lang.length > 0) setLanguages(lang);
        else getSupportedLanguages()
            .then(res => {
                const mapped = res.map(item => ({ value: item.iso_639_1, label: item.name || item.english_name }));
                const filteredLanguages = mapped.slice(1, mapped.length);
                setLanguages(filteredLanguages);
                LanguagesRepository.saveLanguages(filteredLanguages);
            });
    }, []);

    const onSelectLanguage = (selected: {value:string,label:string}) => {
        setLanguage(selected.value);
    };

    const genres = getAvailableGenres().sort((a: object, b: object) => a.value - b.value);
    const onSelectContent = content => content.type == 'serie' ? onSelectSerie(content.value) : onSelectMovie(content.value)

    const includesElement = elem => !elements ? true : elements.includes(elem);


    const onMobile = (
        <div className="headerContainer">
            <Logo />
            <div className="optionButtonsContainer">
                {!isSerie && includesElement(Header.GenreSelector) && <SelectionButton className="optionButton" options={genres} onSelect={onGenreSelected} selectedValue={genre} />}
                {includesElement(Header.TypeSelector) && <SelectionButton className="optionButton" options={[{ value: 'movie', label: "Movie" }, { value: 'serie', label: "Serie" }]} onSelect={onTypeSelected} selectedValue={isSerie ? 'serie' : 'movie'}/>}
            </div>

            {showSearchBar && <div className="mobileSearechContainer">
                {includesElement(Header.SearchBar) && <SearchBar className="searchBar" onChange={onSelectContent} language={language} onSelectLanguage={onSelectLanguage} languages={languages} />}
                {includesElement(Header.LanguageSelector) && <SelectionButton options={[{ value: 'en-US', label: "English" }, { value: 'es-MX', label: "Español" }]} onSelect={onSelectLanguage} className="languajeSelector" />}
            </div>}
            {includesElement(Header.SearchBar) && <img className="searchButton" src={process.env.PUBLIC_URL + "/search.svg"} alt="Search" onClick={() => setShowSearchBar(!showSearchBar)} />}
        </div>);

    const onDesktop = (
        <div className="headerContainer">
            <Logo />
            <div className="buttonContainer">
                {!isSerie && includesElement(Header.GenreSelector) && <SelectionButton className="optionButton" options={genres} onSelect={onGenreSelected} selectedValue={genre} />}
                {includesElement(Header.TypeSelector) && <SelectionButton className="optionButton" options={[{ value: 'movie', label: "Movie" }, { value: 'serie', label: "Serie" }]} onSelect={onTypeSelected} selectedValue={isSerie ? 'serie' : 'movie'}/>}
            </div>
            {includesElement(Header.SearchBar) && <SearchBar className="searchBar" onChange={onSelectContent} language={language} />}
            {includesElement(Header.LanguageSelector) && <SelectionButton className="languajeSelector" options={[{ value: 'en-US', label: "English" }, { value: 'es-MX', label: "Español" }]} onSelect={onSelectLanguage} />}
        </div>);

    return (isDesktop ? onDesktop : onMobile);
};

Header.GenreSelector = 'genreSelector';
Header.TypeSelector = 'typeSelector';
Header.SearchBar = 'searchBar';
Header.LanguageSelector = 'languageSelector';

export default Header;