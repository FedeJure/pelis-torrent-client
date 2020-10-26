import { getTmdbImgPath, TMDBSerieResponse } from "../services/api";

export interface Season {
    season: number,
    episodes: number
}

export interface Serie {
    title: string,
    details: string,
    image: string,
    backgroundImage: string,
    torrents: object[],
    year: number,
    id: string,
    rating: number,
    imdbCode: string | null,
    inEmision: boolean,
    seasons: Season[]
}

const getSerieDto =( response: TMDBSerieResponse) => {
    return ({
        title: response.name,
        details: response.overview,
        image: response.poster_path ? getTmdbImgPath(response.poster_path) : process.env.PUBLIC_URL+"/missing-file.png",
        backgroundImage: response.backdrop_path ? getTmdbImgPath(response.backdrop_path) : process.env.PUBLIC_URL+"/missing-file.png",
        torrents: [],
        year: new Date(response.first_air_date).getFullYear(),
        id: response.id,
        rating: response.vote_average,
        imdbCode: null,
        inEmision: response.next_episode_to_air != null,
        seasons: response.seasons ? response.seasons.filter(s => s.season_number > 0).map(s => ({season: s.season_number, episodes: s.episode_count})) : []
    });
};

export { getSerieDto };