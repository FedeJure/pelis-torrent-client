import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import InfiniteScroll from 'react-infinite-scroller';
import MovieElement, { EmptyMovieElement } from '../../components/movieElement/MovieElement';
import Routes from "../../services/router";
import MoviesGridRepository from "../../repositories/moviesGridRepository";
import { MEDIA_TYPES } from '../../domain/mediaTypes';
import './MovieGrid.css';

const MovieGrid = ({genre, type, fetchMethod, elementsPerPage, onSelect}) => {
    const [contentList, setContentList] = useState([]);
    const [actualPage,setActualPage] = useState(1);
    const [loadMore, setLoadMore] = useState(true);

    const dtoListToElementList = dtoList => {
        return dtoList.map(dto => (
            <MovieElement movie={dto} key={dto.id} onSelect={onSelect}/>
        ));
    }

    const fetchNewContent = async () => {
        const startIndex = (actualPage - 1) * elementsPerPage;
        addDefaultMovies();        
        fetchMethod(actualPage, contentList => {
            addNewContent(contentList, startIndex);  
        });
    }

    const addNewContent = (newMovies, fromIndex) => {
        const oldMovies = [...contentList];
        oldMovies.splice(fromIndex, elementsPerPage, ...dtoListToElementList(newMovies));
        setContentList(oldMovies);
        setLoadMore(true);                
    }

    const addDefaultMovies = () => {
        const defaultMovies = [];
        for (let index = 0; index < elementsPerPage; index++) {
            defaultMovies.push(<EmptyMovieElement name="empty" key={Math.random()}/>);
        }
        setContentList([...contentList, ...defaultMovies]);
        setActualPage(actualPage + 1);
        setLoadMore(false);
    };

    useEffect(() => {
        setContentList([]);
        setActualPage(1);
    }, [genre]);

    useEffect(() => {
        fetchNewContent();
    },[])

    return (
        <div className="movieGridContainer">
            <p>{genre.value ? genre.label : "Last Releases"}: <img className="titleBackground" src={process.env.PUBLIC_URL + "/titleBackground.svg"}/></p>
            <InfiniteScroll
                pageStart={0}
                loadMore={fetchNewContent}
                hasMore={loadMore}
                loader={<div className="loader" key={0}></div>}>
                    <div className="movieGrid">
                        {contentList}
                    </div>
            </InfiniteScroll>
        </div>
    )
};

export default MovieGrid;