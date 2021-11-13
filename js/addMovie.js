slowDownBgVideo();

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
    
    let movie = new Movie(movieName.value, image.value, synopsis.value, linkToMovie.value, Number(rating.value))
    let options = {
        method: "POST",
        body: JSON.stringify({ movie }),
        headers: { 'Content-Type': 'application/json' }
    }
    restApiById(SAVE_MOVIE_ENDPOINT, options)
        .finally(alert("your movie has been added"))
}