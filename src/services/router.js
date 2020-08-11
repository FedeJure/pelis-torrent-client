const getMovieUrl = movieId => {
    return `/movie/${movieId}`;
}

const getSerieUrl = serieId => {
    return `/serie/${serieId}`
}

const getHomeRoute = () => {
    return `/`;
}

const getHomeSeriesRoute = () => {
    return '/series';
}

const getHomeRouteWithGenre = (genre) => {
    return `/genre/${genre}`;
}

export default { getMovieUrl, getHomeRoute, getHomeRouteWithGenre, getHomeSeriesRoute, getSerieUrl };