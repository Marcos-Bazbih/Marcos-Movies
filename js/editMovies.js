class Movie {
    movieName;
    image;
    synopsis;
    linkToMovie;
    rating;
    constructor(_MovieName, _MovieIMage, _MovieSynopsis, _MovieLink, _MovieRating) {
        this.movieName = _MovieName;
        this.image = _MovieIMage;
        this.synopsis = _MovieSynopsis;
        this.linkToMovie = _MovieLink;
        this.rating = _MovieRating;

    }
}

postMovieForm.onsubmit = (event) => {
    event.preventDefault();
    
    let movie = new Movie(postMovieName.value, postImage.value, postSynopsis.value, postLinkToMovie.value, Number(postRating.value))
    let options = {
        method: "POST",
        body: JSON.stringify({ movie }),
        headers: { 'Content-Type': 'application/json' }
    }
    restApiById(SAVE_MOVIE_ENDPOINT, options)
        .finally(alert("your movie has been added"))
}


editMovieForm.onsubmit = (event) => {
    event.preventDefault();
    
    let movie = new Movie(putMovieName.value, putImage.value, putSynopsis.value, putLinkToMovie.value, Number(putRating.value))
    let options = {
        method: "PUT",
        body: JSON.stringify({ movie }),
        headers: { 'Content-Type': 'application/json' }
    }
    restApiById(BY_ID_ENDPOINT+putMovieId.value, options)
        .finally(alert("your movie has been updated"))
}