const backendUrl = "http://localhost:3001";

const getImdbId = async movieId => (await fetch(`${backendUrl}/tmdb/movie/${movieId}?api_key=133f4d8b4fed128b27fa0bb407956c56`)).json();
const getMovieCompleteData = async imdbId => (await fetch(`${backendUrl}/yts?query_term=${imdbId}`)).json();
const searchMovies = async (query, language) => (await fetch(`${backendUrl}/tmdb/search?language=${language}&page=1&query=${query}`)).json();
const getTrendingMovies = async (limit, page, callback) => fetch(`${backendUrl}/yts/homeMovies?limit=${limit}&page=${page}`)
                            .then(response => response.json())
                            .then(result => {
                                console.log(result)
                                callback(result);
                            });
const getTmdbImgPath = image => `https://image.tmdb.org/t/p/w500/${image}`;
export { getImdbId, getMovieCompleteData, searchMovies, getTmdbImgPath, getTrendingMovies };