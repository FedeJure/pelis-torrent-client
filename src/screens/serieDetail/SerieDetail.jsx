import React, {useEffect} from 'react';
import { useParams } from "react-router-dom";
import { getSerieData } from "../../services/api"

import Header from '../../components/header/Header';

import "./SerieDetail.css";

const SerieDetailScreen = () => {
    const { serieId } = useParams();

    useEffect(() => {
        getSerieData(serieId, response => {
            console.log(response);
        })
    }, []);
    
    return (<div className="serieDetail commonPage">
        <Header/>
        <span className="soon">Very soon...</span>
    </div>);
}

export default SerieDetailScreen;