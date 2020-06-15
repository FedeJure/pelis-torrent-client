const getMovieDto = response => {
    return ({
        title: response.title,
        details: response.summary,
        image: response.medium_cover_image,
        torrents: response.torrents,
        year: response.year
    });
};

export { getMovieDto };