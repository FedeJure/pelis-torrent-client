const repoKey = "storageMoviesRepository";
const repoIndexKey = 'storageMoviesIndex';
const maxLength = 10;

const getMovie = movieId => {
    const repoIndex = JSON.parse(localStorage.getItem(repoIndexKey)) || [];
    if (!repoIndex.find(item => item == movieId)) {
        localStorage.setItem(repoIndexKey, JSON.stringify(repoIndex)); //inicializo si no esta inicializado
        return null;
    }
    const storage = JSON.parse(localStorage.getItem(repoKey)) || {};
    return storage[movieId];
}

const saveMovie = movie => {
    var repoIndex = JSON.parse(localStorage.getItem(repoIndexKey)) || [];
    const storage = JSON.parse(localStorage.getItem(repoKey)) || {};
    if (repoIndex.length >= 10) delete storage[repoIndex.pop()];
    repoIndex = repoIndex.filter(code => code != movie.imdbCode);
    repoIndex.splice(0,0,movie.imdbCode);
    storage[movie.imdbCode] = movie;

    localStorage.setItem(repoKey, JSON.stringify(storage));
    localStorage.setItem(repoIndexKey, JSON.stringify(repoIndex));
}

export default { getMovie, saveMovie};