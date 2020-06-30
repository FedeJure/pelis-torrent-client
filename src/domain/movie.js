const getMovieDto = response => {
    return ({
        title: response.title,
        details: response.summary,
        image: response.medium_cover_image,
        backgroundImage: response.background_image,
        torrents: response.torrents,
        year: response.year,
        id: response.id,
        rating: response.rating,
        imdbCode: response.imdb_code
    });
};

export { getMovieDto };