import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useHistory, useParams } from "react-router-dom";
import SearchBar from "../../components/searchBar/SearchBar";
import Logo from "../../components/logo/Logo";
import { getImdbId, getMovieCompleteData, getSupportedLanguages } from '../../services/api';
import { getMovieDto } from '../../domain/movie';
import Routes from "../../services/router";
import MoviesRepository from "../../repositories/moviesRepository";
import LanguagesRepository from "../../repositories/languagesRepository";
import { getAvailableGenres } from "../../repositories/genresRepository";
import { MediaTypeRepository } from "../../repositories/sessionStateRepository";
import SelectionButton from '../selectionButton/SelectionButton'
import './Header.css'

const Header = ({ isSerie, elements }) => {
    const mediaTypeRepository = MediaTypeRepository.useContainer();
    const [language, setLanguage] = useState('en-US');
    const [languages, setLanguages] = useState([]);
    const [showSearchBar, setShowSearchBar] = useState(false);
    const [genres, setGenres] = useState([])
    const history = useHistory();
    const isDesktop = useMediaQuery({ query: '(min-width: 960px)' })

    const {genre} = useParams();

    const onGenreSelected = genre => {     
        mediaTypeRepository.setNewGenre(genre)
        if (!genre.value) history.push(Routes.getHomeRoute());
        else history.push(isSerie ? Routes.getSerieHomeRouteWithGenre(genre.value) : Routes.getHomeRouteWithGenre(genre.value));
    };

    const onTypeSelected = type => {
        mediaTypeRepository.setMediaType(type);      
        if (type.value == 'serie') history.push(Routes.getHomeSeriesRoute());
        else history.push(Routes.getHomeRoute());
    }

    const onSelectMovie = async movieId => {
        if (!movieId) return;
        const { imdb_id } = await getImdbId(movieId);
        const { data } = await getMovieCompleteData(imdb_id);
        if (data.movies && data.movies.length > 0) {
            const movie = getMovieDto(data.movies[0]);
            MoviesRepository.saveMovie(movie);
            history.push(Routes.getMovieUrl(movieId, movie.title));
            window.location.reload();
        }
    }

    const onSelectSerie = serieId => {
        if (!serieId) return;
        history.push(Routes.getSerieUrl(serieId));
        window.location.reload();
    }

    useEffect(() => {
        getAvailableGenres().then(data => {
            setGenres(data.sort((a, b) => a.value - b.value));
          })
        const lang = LanguagesRepository.getLanguages();
        if (lang.length > 0) setLanguages(lang);
        else getSupportedLanguages()
            .then(res => {
                const mapped = res.map(item => ({ value: item.iso_639_1, label: item.name || item.english_name }));
                const filteredLanguages = mapped.slice(1, mapped.length);
                setLanguages(filteredLanguages);
                LanguagesRepository.saveLanguages(filteredLanguages);
            });
        
        if (genre != undefined) mediaTypeRepository.setNewGenre({label: genre, value:genre})
        else mediaTypeRepository.setNewGenre({label: "All", value:null})
    }, []);

    const onSelectLanguage = selected => {
        setLanguage(selected.value);
    };

    const onSelectContent = content => content.type == 'serie' ? onSelectSerie(content.value) : onSelectMovie(content.value)

    const includesElement = elem => !elements ? true : elements.includes(elem);
    const onMobile = (
        <div className="headerContainer">
            <Logo />
            <div className="optionButtonsContainer">
                {includesElement(HeaderComponents.GenreSelector) && <SelectionButton className="optionButton" options={genres} onSelect={onGenreSelected} selectedValue={mediaTypeRepository.genre} />}
                {includesElement(HeaderComponents.TypeSelector) && <SelectionButton className="optionButton" options={[{ value: 'movie', label: "Movie" }, { value: 'serie', label: "Serie" }]} onSelect={onTypeSelected} selectedValue={{label: isSerie ? 'serie' : 'movie'}}/>}
            </div>

            {showSearchBar && <div className="mobileSearechContainer">
                {includesElement(HeaderComponents.SearchBar) && <SearchBar className="searchBar" onChange={onSelectContent} language={language} onSelectLanguage={onSelectLanguage} languages={languages} />}
                {includesElement(HeaderComponents.LanguageSelector) && <SelectionButton options={[{ value: 'en-US', label: "English" }, { value: 'es-MX', label: "Español" }]} onSelect={onSelectLanguage} className="languajeSelector" />}
            </div>}
            {includesElement(HeaderComponents.SearchBar) && <img className="searchButton" src={process.env.PUBLIC_URL + "/search.svg"} alt="Search" onClick={() => setShowSearchBar(!showSearchBar)} />}
        </div>);

    const onDesktop = (
        <div className="headerContainer">
            <Logo />
            <div className="buttonContainer">
                {includesElement(HeaderComponents.GenreSelector) && <SelectionButton className="optionButton" options={genres} onSelect={onGenreSelected} selectedValue={mediaTypeRepository.genre} />}
                {includesElement(HeaderComponents.TypeSelector) && <SelectionButton className="optionButton" options={[{ value: 'movie', label: "Movie" }, { value: 'serie', label: "Serie" }]} onSelect={onTypeSelected} selectedValue={{label: isSerie ? 'serie' : 'movie'}}/>}
            </div>
            {includesElement(HeaderComponents.SearchBar) && <SearchBar className="searchBar" onChange={onSelectContent} language={language} />}
            {includesElement(HeaderComponents.LanguageSelector) && <SelectionButton className="languajeSelector" options={[{ value: 'en-US', label: "English" }, { value: 'es-MX', label: "Español" }]} onSelect={onSelectLanguage} selectedValue={{ label: "English" }}/>}
        </div>);

    return (isDesktop ? onDesktop : onMobile);
};
const HeaderComponents = {
    GenreSelector: 'genreSelector',
    TypeSelector: 'typeSelector',
    SearchBar: 'searchBar',
    LanguageSelector: 'languageSelector'
}


export default Header;
export { HeaderComponents }