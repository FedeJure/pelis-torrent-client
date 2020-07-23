const getMovieUrl = movieId => {
    return `/movie/${movieId}`;
}

const getHomeRoute = () => {
    return `/`;
}

const getHomeRouteWithGenre = (genre) => {
    return `/genre/${genre}`;
}

export default { getMovieUrl, getHomeRoute, getHomeRouteWithGenre };