import { getMovieGenres } from "../services/api"

var genres = []

const getAvailableGenres = async () => {
    if (genres.length == 0) {
        genres = (await getMovieGenres()).map(g => ({label: g.name, value:g.name}));
        genres.push({label:"All", value:null});
    }
    return genres;
};

const getDefaultGenre = () => ({label: "All", value: null})

export {getAvailableGenres, getDefaultGenre};