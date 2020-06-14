const getImdbId = async movieId => (await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=133f4d8b4fed128b27fa0bb407956c56`)).json();
const getMovieCompleteData = async imdbId => (await fetch(`https://yts.mx/api/v2/list_movies.json?query_term=${imdbId}`)).json();
const searchMovies = async (query, language) => (await fetch(`https://api.themoviedb.org/3/search/movie?api_key=133f4d8b4fed128b27fa0bb407956c56&language=${language}&page=1&include_adult=false&query=${query}`)).json();
const getTmdbImgPath = image => `https://image.tmdb.org/t/p/w500/${image}`;
export { getImdbId, getMovieCompleteData, searchMovies, getTmdbImgPath };