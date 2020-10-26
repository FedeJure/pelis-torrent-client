export interface Genre {
    value: string,
    label: string
}

function getAvailableGenres() : Genre[] {
    return ([{value: '', label: 'All'},
            {value: 'comedy', label: 'Comedy'}, 
            {value: 'sci-fi', label: 'Sci-Fi'}, 
            {value: 'horror', label: 'Horror'}, 
            {value: 'romance', label: 'Romance'}, 
            {value: 'action', label: 'Action'}, 
            {value: 'thriller', label: 'Thriller'}, 
            {value: 'drama', label: 'Drama'}, 
            {value: 'mystery', label: 'Mystery'}, 
            {value: 'crime', label: 'Crime'}, 
            {value: 'animation', label: 'Animation'}, 
            {value: 'adventure', label: 'Adventure'}, 
            {value: 'fantasy', label: 'Fantasy'}, 
            {value: 'biography', label: 'Biography'}, 
            {value: 'family', label: 'Family'}, 
            {value: 'history', label: 'History'}, 
            {value: 'documentary', label: 'Documentary'}, 
            {value: 'music', label: 'Music'}, 
            {value: 'musical', label: 'Musical'}, 
            {value: 'sport', label: 'Sport'}, 
            {value: 'war', label: 'War'}, 
            {value: 'western', label: 'Western'}])
};

export {getAvailableGenres};