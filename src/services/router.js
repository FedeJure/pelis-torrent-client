const getMovieUrl = movieId => {
    return `/movie/${movieId}`;
}

const getHomeRoute = () => {
    return "/";
}

export default { getMovieUrl, getHomeRoute };