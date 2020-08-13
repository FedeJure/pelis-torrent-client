import { getTmdbImgPath } from "../services/api";

const getSerieDto = response => {
    return ({
        title: response.name,
        details: response.overview,
        image: getTmdbImgPath(response.poster_path),
        backgroundImage: getTmdbImgPath(response.backdrop_path),
        torrents: [],
        year: new Date(response.first_air_date).getFullYear(),
        id: response.id,
        rating: response.vote_average,
        imdbCode: null,
        inEmision: response.next_episode_to_air != null,
        seasons: response.seasons ? response.seasons.map(s => ({season: s.season_number + 1, episodes: s.episode_count})) : []
    });
};

export { getSerieDto };