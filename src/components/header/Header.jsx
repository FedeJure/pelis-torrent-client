import React, {useState} from 'react';
import Select from 'react-select';
import { useHistory } from "react-router-dom";
import SearchBar from "../../components/searchBar/SearchBar";
import { getImdbId, getMovieCompleteData } from '../../services/api';
import { getMovieDto } from '../../domain/movie';
import Routes from "../../services/router";
import MoviesRepository from "../../repositories/moviesRepository";
import './Header.css'

const Header = () => {
  const [language, setLanguage] = useState('en-US');
  const history = useHistory();


    const languages = [
        { value: 'en-US', label: 'English' },
        { value: 'es-ES', label: 'Español' }
    ];

    const onSelectMovie = movie => {
        MoviesRepository.saveMovie(movie);
        history.push(Routes.getMovieUrl(movie.id));
        window.location.reload();
    }

    const onChange = async movieId => {
        if (!movieId) return;
        const { imdb_id } = await getImdbId(movieId);
        const { data } = await getMovieCompleteData(imdb_id);
        if (data.movies.length > 0)
        onSelectMovie(getMovieDto(data.movies[0]));
    };

    const onSelectLanguage = selected => {
        setLanguage(selected.value);
    };

    return (<div className="searchBarContainer">
                <SearchBar onChange={onChange} language={language}/>
                <Select placeholder="Search language" options={languages} onChange={onSelectLanguage} className="languajeSelector"/>                
            </div>);
};

export default Header;