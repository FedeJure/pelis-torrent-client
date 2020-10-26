"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
require("./Home.css");
var MovieGrid_1 = require("../../components/movieGrid/MovieGrid");
var Header_1 = require("../../components/header/Header");
var movie_1 = require("../../domain/movie");
var serie_1 = require("../../domain/serie");
var genresRepository_1 = require("../../repositories/genresRepository");
var api_1 = require("../../services/api");
var Home = function (_a) {
    var isSerie = _a.isSerie, type = _a.type;
    var contentPerPage = 20;
    var _b = react_1.useState({}), torrent = _b[0], setTorrent = _b[1];
    var _c = react_1.useState({}), selectedMovie = _c[0], setSelectedMovie = _c[1];
    var _d = react_1.useState({ value: null }), selectedGenre = _d[0], setSelectedGenre = _d[1];
    var showPlayer = torrent.hash;
    var history = react_router_dom_1.useHistory();
    var genre = react_router_dom_1.useParams().genre;
    var genreObject = genresRepository_1.getAvailableGenres().find(function (g) { return g.value == genre; });
    var fetchSeriesPage = function (actualPage, callback) {
        api_1.getTrendingSeries(contentPerPage, actualPage, genreObject.value, function (result) {
            callback(result.results.map(serie_1.getSerieDto));
        });
    };
    var fetchMoviePage = function (actualPage, callback) {
        api_1.getTrendingMovies(contentPerPage, actualPage, genreObject.value, function (result) {
            callback(result.data.movies.map(movie_1.movieFromResponse));
        });
    };
    var onMovieSelect = function (movie) { return process.env.PUBLIC_URL + "/movie/" + movie.imdbCode; };
    var onSerieSelect = function (serie) { return process.env.PUBLIC_URL + "/serie/" + serie.id; };
    return (react_1["default"].createElement("div", { className: "Home commonPage" },
        react_1["default"].createElement(Header_1["default"], { isSerie: isSerie, genre: genre }),
        react_1["default"].createElement(MovieGrid_1["default"], { genre: genreObject || selectedGenre, type: type, fetchMethod: !isSerie ? fetchMoviePage : fetchSeriesPage, elementsPerPage: contentPerPage, onSelect: !isSerie ? onMovieSelect : onSerieSelect })));
};
exports["default"] = Home;
//# sourceMappingURL=Home.js.map