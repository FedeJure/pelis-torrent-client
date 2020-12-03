import { getTmdbImgPath } from "../services/api";

const getMovieDto = response => {
    return ({
        title: response.title,
        details: response.overview,
        image: response.poster_path ? getTmdbImgPath(response.poster_path) : process.env.PUBLIC_URL+"/missing-file.png",
        backgroundImage: response.backdrop_path ? getTmdbImgPath(response.backdrop_path) : process.env.PUBLIC_URL+"/missing-file.png",
        torrents: response.torrents,
        year: new Date(response.release_date).getFullYear(),
        id: response.id,
        rating: response.vote_average,
    });
};

const getMovieDtoFromYts = response => {
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
};

export { getMovieDto, getMovieDtoFromYts };