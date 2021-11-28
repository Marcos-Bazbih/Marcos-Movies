const bgImg = document.getElementById("bg-img");


getFromApi(cardsContainer, BASIC_API + "all")
    .then(res => addMovieCard(res.data))

searchBtn.onclick = () => {
    getFromApi(cardsContainer, BASIC_API + SEARCH_ENDPOINT + searchInput.value)
        .then(res => addMovieCard(res.data))
}


function sortByName(a, b) {
    if (a.movieName.toLowerCase() < b.movieName.toLowerCase()) {
        return -1;
    }
    if (a.movieName.toLowerCase() > b.movieName.toLowerCase()) {
        return 1;
    }
    return 0;
}
function sortByRating(a, b) { return b.rating - a.rating; }
function sortByDate(a, b) { return new Date(b.date) - new Date(a.date); }

function sortBtnActions(sortFunc) {
    getFromApi(cardsContainer, BASIC_API + "all")
        .then(res => res.data.sort(sortFunc))
        .then(res => addMovieCard(res))
}


sortSelect.onchange = () => {
    switch (sortSelect.value) {
        case "ByName":
            sortBtnActions(sortByName);
            break;
        case "ByRating":
            sortBtnActions(sortByRating);
            break;
        case "ByDate":
            sortBtnActions(sortByDate);
            break;
        default:
            break;
    }
}


function addMovieCard(array) {
    if (array.length > 0) {
        cardsContainer.innerHTML = "";
        for (let movie of array) {
            cardsContainer.innerHTML +=
                `<article class="movie-card">
                    <div class="card-img-box">
                    <img class="card-img" src=${movie.image}>
                    </div>
                    <div class="card-info-box">
                    <h1 class="card-header-1">${movie.movieName}</h1>
                    <h2 class="card-header-2">Rating: ${movie.rating}/10</h2>
                    </div>
                    <div class="buttons-box">
                    <button class="card-buttons" onclick="getMovieIdToDisplay('${movie._id}')">More Info</button>
                    <button class="card-buttons" onclick="deleteMovie('${movie._id}')">Delete</button>
                    </div>
                    </article>`
        }
    } else {
        alert(`No movies found`);
        location.reload();
    }
}


function deleteMovie(id) {
    let options = { method: "DELETE" };
    restApiById(BY_ID_ENDPOINT + id, options)
        .then(res => alert(`${res.data.movieName} has been deleted`))
}


function getMovieIdToDisplay(id) {
    fetch(`https://moviesmern.herokuapp.com/movies/movie/${id}`)
        .then(res => res.json())
        .then(res => moreInfo(res.data))
}
function moreInfo(movie) {
    movieImg.src = `${movie.image}`;
    movieInfo.innerHTML =
        `<h1 class="movie-info-header1">${movie.movieName}</h1>
         <h2 class="movie-info-header2">Id: ${movie._id}</h2>
         <h2 class="movie-info-header2">Rating: ${movie.rating}/10</h2>
         <h2 class="movie-info-header2">Date: ${movie.date}</h2>
         <h2 class="movie-info-header2 synopsis">${movie.synopsis}</h2>
         <h2 class="movie-info-header2"><a class="movie-info-link" href=${movie.linkToMovie} target="blank">more info</a></h2>
         `
    cardsContainer.style.display = "none";
    moviePage.style.left = "0";
}
leaveBtn.onclick = () => {
    cardsContainer.style.display = "flex"
    moviePage.style.left = "100%"
}