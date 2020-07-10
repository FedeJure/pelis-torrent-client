const repoKey = "homeMovieList";
const lastTimeSavedKey = "homeMovieListDate";
const hoursSaved = 12;

const getMovies = () => {
    const saveDate = new Date(localStorage.getItem(lastTimeSavedKey));
    const now = new Date();
    const delta = now.getTime() - saveDate.getTime();
    if (delta / 3600000 > hoursSaved) {
        localStorage.setItem(repoKey, JSON.stringify([]));
        localStorage.setItem(lastTimeSavedKey, now.getTime());
    } 
    return JSON.parse(localStorage.getItem(repoKey)) || [];
}

const saveNewMovies = newMovies => {
    const oldMovies = JSON.parse(localStorage.getItem(repoKey)) || [];
    localStorage.setItem(repoKey, JSON.stringify([...oldMovies, ...newMovies]));
}

export default { getMovies, saveNewMovies};