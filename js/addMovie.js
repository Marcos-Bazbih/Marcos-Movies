class Movie {
    constructor(movieName, image, linkToMovie, synopsis, rating) {
        this.movieName = movieName;
        this.image = image;
        this.linkToMovie = linkToMovie;
        this.synopsis = synopsis;
        this.rating = rating;
    }
}

async function addMoviePromise(bodyObj) {
    try {
        return await fetch("https://moviesmern.herokuapp.com/movies/saveMovie", bodyObj)
            .then(res => res.json())
    } catch (err) {
        return err;
    }
}

postMovieForm.onsubmit = (event) => {
    event.preventDefault();

    let addedMovie = new Movie(movieName.value, image.value, linkToMovie.value, synopsis.value, rating.value);
    let options = {
        method: 'POST',
        body: JSON.stringify({ addedMovie }),
        headers: { 'Content-Type': 'application/json' }
    }
    addMoviePromise(options)
        .then(res => console.log(res))
}