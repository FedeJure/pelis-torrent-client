import React, {useState} from 'react';
import Select from 'react-select'
import SearchBar from "../searchBar/SearchBar";
import { getImdbId, getMovieCompleteData } from '../api'
import { getMovieDto } from '../domain/movie'


const Header = ({onSelectMovie}) => {
  const [language, setLanguage] = useState('en-US');


    const languages = [
        { value: 'en-US', label: 'English' },
        { value: 'es-ES', label: 'Español' }
    ];

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
                <Select placeholder="Language" options={languages} onChange={onSelectLanguage} className="languajeSelector"/>
                <SearchBar onChange={onChange} language={language} className="searchBar" />
            </div>);
};

export default Header;