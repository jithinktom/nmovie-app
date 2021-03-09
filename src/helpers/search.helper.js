const filterSearchResults = (results, searchOption) => {
    const actors = []
    const movies = []
    const shows = []
    results.forEach(result => {
        if (result.id &&
            (result.title || result.name)) {
            if (searchOption === "person" || result.media_type === "person") {
                actors.push(result)
            }
            else if (searchOption === "tv" || result.media_type === "tv") {
                shows.push(result)
            }
            else{
                movies.push(result)
            }
            return result
        }
    })
    return {
        actors: actors.sort((a, b) => a.popularity - b.popularity),
        movies: movies.sort((a, b) => a.popularity - b.popularity),
        shows: shows.sort((a, b) => a.popularity - b.popularity)
    }
}

const filterMovieDetail = (movieDetail) => {
    const actors = []
    movieDetail.credits.cast.forEach(result => {
        if (result.id &&
            result.name) {
            actors.push(result)
        }
    })
    return {
        ...movieDetail,
        credits: {
            cast: actors
        }
    }
}

const filterActorDetail = (actorDetail) => {
    const movies = []
    actorDetail.movie_credits.cast.forEach(result => {
        if (result.id &&
            result.title) {
            movies.push(result)
        }
    })
    return {
        ...actorDetail,
        movie_credits: {
            cast: movies
        }
    }
}

export {
    filterSearchResults,
    filterMovieDetail,
    filterActorDetail
}