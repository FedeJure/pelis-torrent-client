import React, {useEffect, useState} from 'react';
import { useParams } from "react-router-dom";
import { getSerieData } from "../../services/api"
import {getSerieDto} from "../../domain/serie";
import BackgroundImage from "../../components/backgroundImage/BackgroundImage";
import ContentDescription from "../../components/contentDescription/ContentDescription";


import Header from '../../components/header/Header';

import "./SerieDetail.css";

const SerieDetailScreen = () => {
    const { serieId } = useParams();
    const [serie, setSerie] = useState({});

    useEffect(() => {
        getSerieData(serieId, response => {
            setSerie(getSerieDto(response));
        })
    }, []);
    
    return (<div className="serieDetail commonPage">
        <Header isSerie={true}/>
        {serie && serie.backgroundImage && <BackgroundImage image={serie.backgroundImage}/> }
        {serie && <ContentDescription title={serie.title} details={serie.details} image={serie.image}/>}
    </div>);
}

export default SerieDetailScreen;