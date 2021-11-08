const BASIC_API = "https://moviesmern.herokuapp.com";
async function getFromApi(Api, endpoint) {
    try {
        return await fetch(`${Api}/${endpoint}`)
            .then(res => res.json())
    } catch (err) {
        return err;
    }
}
getFromApi(BASIC_API, "movies/all")
    .then(res => addMovieCard(res.data))

function addMovieCard(array){
    for(let movie of array){
        cardsContainer.innerHTML +=
        `<article class="movieCard">
            <div class="cardImgBox">
                <img src=${movie.image}>
            </div>
            <div class="cardInfoBox">
                <h1>${movie.movieName}</h1>
                <h2>Rating: ${movie.rating}/10</h2>
            </div>
            <div class="btnsBox">
                <button>More Info</button>
                <button>Delete</button>
                <button>Edit</button>
            </div>
        </article>`
    }
}