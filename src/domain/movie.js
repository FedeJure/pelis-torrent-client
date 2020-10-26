"use strict";
exports.__esModule = true;
exports.movieFromResponse = void 0;
;
function movieFromResponse(response) {
    return ({
        title: response.title,
        details: response.summary,
        image: response.medium_cover_image ? response.medium_cover_image : process.env.PUBLIC_URL + "/missing-file.png",
        backgroundImage: response.background_image ? response.background_image : process.env.PUBLIC_URL + "/missing-file.png",
        torrents: response.torrents,
        year: response.year,
        id: response.id,
        rating: response.rating,
        imdbCode: response.imdb_code
    });
}
exports.movieFromResponse = movieFromResponse;
//# sourceMappingURL=movie.js.map