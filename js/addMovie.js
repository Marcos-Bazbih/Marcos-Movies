async function getApi(api, obj) {
    try {
        return await fetch(api, obj)
            .then(response => response.json());
    }
    catch (err) {
        return err;
    }
}

class Movie {
    movieName;
    image;
    synopsis;
    linkToMovie;
    rating;
    constructor(MovieName, MovieIMage, MovieSynopsis, MovieLink, MovieRating) {
        this.movieName = MovieName;
        this.image = MovieIMage;
        this.synopsis = MovieSynopsis;
        this.linkToMovie = MovieLink;
        this.rating = MovieRating;

    }
}

addMovie.onclick = () => {
    let movie = new Movie(movieName.value, image.value, synopsis.value, linkToMovie.value, Number(rating.value))
    let options = {
        method: "POST",
        body: JSON.stringify({ movie }),
        headers: { 'Content-Type': 'application/json' }
    }
    getApi("https://moviesmern.herokuapp.com/movies/saveMovie", options)
        .then(res => console.log(res))
        .finally(alert("your movie has been added"))
}