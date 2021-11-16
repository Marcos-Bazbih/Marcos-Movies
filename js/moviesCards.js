slowDownBgVideo();

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
function sortByRating(a, b) {
    return b.rating - a.rating;
}
function sortByDate(a, b) {
    return new Date(b.date) - new Date(a.date);
}

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
                `<article class="movieCard">
                    <div class="cardImgBox">
                    <img src=${movie.image}>
                    </div>
                    <div class="cardInfoBox">
                    <h1>${movie.movieName}</h1>
                    <h2>Rating: ${movie.rating}/10</h2>
                    </div>
                    <div class="btnsBox">
                    <button onclick="getMovieIdToDisplay('${movie._id}')">More Info</button>
                    <button onclick="deleteMovie('${movie._id}')">Delete</button>
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
    movieImgId.src = `${movie.image}`;
    movieInfo.innerHTML =
        `<h1>${movie.movieName}</h1>
         <h2>Id: ${movie._id}</h2>
         <h2>Rating: ${movie.rating}/10</h2>
         <h2>Date: ${movie.date}</h2>
         <h2 id="synopsis">${movie.synopsis}</h2>
         <h2><a href=${movie.linkToMovie} target="blank">more info</a></h2>
         `
    cardsContainer.style.display = "none";
    moviePage.style.left = "0";
    bgVideo.style.zIndex = "999";
}
leaveBtn.onclick = () => {
    cardsContainer.style.display = "flex"
    moviePage.style.left = "100%"
    bgVideo.style.zIndex = "-100"
}