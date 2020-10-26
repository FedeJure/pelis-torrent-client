import { YTSMovieResponse } from "../services/api";

export interface Movie {        
    title: string,
    details: string,
    image: string,
    backgroundImage: string,
    torrents: object[],
    year: string,
    id: string,
    rating: string,
    imdbCode: string
};

function movieFromResponse(response: YTSMovieResponse) : Movie {
    return ({
        title: response.title,
        details: response.summary,
        image: response.medium_cover_image ? response.medium_cover_image : process.env.PUBLIC_URL+"/missing-file.png",
        backgroundImage: response.background_image ? response.background_image : process.env.PUBLIC_URL+"/missing-file.png",
        torrents: response.torrents,
        year: response.year,
        id: response.id,
        rating: response.rating,
        imdbCode: response.imdb_code
    });
}

export { movieFromResponse };