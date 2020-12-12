import React, { useState } from "react"
import { createContainer } from "unstated-next"

const MEDIA_TYPE = {movie: {label: "Movie", value: "movie"}, serie: {label: "Serie", value: "serie"}};
const types = Object.values(MEDIA_TYPE);

const TypeRepository = () => {
    const [type, setType] = useState(MEDIA_TYPE.movie)
    const [genre, setGenre] = useState({label: "All", value: null})
    const setMediaType = mediaType => setType(mediaType);
    const setNewGenre = newGenre => setGenre(newGenre)

    return { type, setMediaType, genre, setNewGenre }
}
  
const MediaTypeRepository = createContainer(TypeRepository)

export { MediaTypeRepository }