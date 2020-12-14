const getMovieUrl = (movieId, name) => {
    return `/movie/${getFormatedTitle(name)}/${movieId}`;
}

const getSerieUrl = (serieId, season, episode, name) => {
    return `/serie/${getFormatedTitle(`${name} ${season ? `season ${season}` : ""} ${ episode ? `episode ${episode}` : " "}`)}/${serieId}${season && episode ? `/${season}/${episode}` : ""}`
}

const getHomeRoute = () => {
    return `/movies`;
}

const getHomeSeriesRoute = () => {
    return '/series';
}

const getHomeRouteWithGenre = (genre) => {
    return `/movies/genre/${genre}`;
}

const getSerieHomeRouteWithGenre = genre => {
    return `/series/genre/${genre}`;
}

const getFormatedTitle = title => title ? title.toLowerCase().trim().replaceAll(' ','_'): "";

const getRootPublicUrl = () => process.env.PUBLIC_URL;

export default { getMovieUrl, getHomeRoute, getHomeRouteWithGenre, getHomeSeriesRoute, getSerieUrl, getSerieHomeRouteWithGenre, getRootPublicUrl };