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
    let infoBtns = document.getElementsByClassName("infoBtns")
    let DeleteBtns = document.getElementsByClassName("DeleteBtns")
    let options = { method: "DELETE" };
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
                    <button class="infoBtns">More Info</button>
                    <button class="DeleteBtns">Delete</button>
                    </div>
                    </article>`
        }
        for (let i = 0; i < infoBtns.length; i++) {
            infoBtns[i].onclick = () => { moreInfo(array[i]) }
            DeleteBtns[i].onclick = () => {
                restApiById(BY_ID_ENDPOINT + array[i]._id, options);
                alert(`${array[i].movieName} has been deleted`);
                location.reload();
            }
        }
    } else {
        alert(`No movies found`);
        location.reload();
    }
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