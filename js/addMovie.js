class Movie {
    movieName;
    image;
    rating;
    synopsis;
    linkToMovie;
    constructor(_movieName, _image, _rating, _synopsis, _linkToMovie) {
        this.movieName = _movieName;
        this.image = _image;
        this.rating = _rating;
        this.synopsis = _synopsis;
        this.linkToMovie = _linkToMovie;
    }
}


async function addMoviePromise(api, options) {
    try {
        return await fetch(api, options)
            .then(res => res.json())
            .then(res => console.log(res))
    } catch (err) {
        return err;
    }
}

postMovieForm.onsubmit = (event) => {
    event.preventDefault();
    let addedMovie = new Movie(nameInput.value, imgInput.value, ratingInput.value, synopsisInput.value, linkInput.value);
    let options = {
        method: "POST",
        body: JSON.stringify({addedMovie}),
        headers: { 'Content-Type': 'application/json' }
    };
    addMoviePromise("https://moviesmern.herokuapp.com/movies/saveMovie", options)
}
