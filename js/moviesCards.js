document.querySelector('video').playbackRate = 0.50;

async function getAllMovies(api) {
    try {
        return await fetch(api)
            .then(res => res.json())
            .then(res => res.data)
    } catch (err) {
        return err;
    }
}
getAllMovies("https://moviesmern.herokuapp.com/movies/all")
    .then(res => addMovieCard(res))

searchBtn.onclick = () => {
    getAllMovies("https://moviesmern.herokuapp.com/movies/movie/searchByName/" + searchInput.value)
        .then(res => addMovieCard(res))
}



async function getMovieById(id, options) {
    try {
        return await fetch(`https://moviesmern.herokuapp.com/movies/movie/${id}`, options)
            .then(res => res.json())
            .then(res => console.log(res))
    } catch (err) {
        return err;
    }
}



function addMovieCard(array) {
    let infoBtns = document.getElementsByClassName("infoBtns")
    let DeleteBtns = document.getElementsByClassName("DeleteBtns")
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
            let options = {
                method: "DELETE"
            }
            DeleteBtns[i].onclick = () => {
                getMovieById(array[i]._id, options);
                alert(`${array[i].movieName} has been deleted`);
                location.reload();
            }
        }
    } else {
        alert(`${searchInput.value} is not here, sorry`)
    }
}



function moreInfo(movie) {
    movieImgId.src = `${movie.image}`;
    movieInfo.innerHTML = "";
    movieInfo.innerHTML =
        `<h1>${movie.movieName}</h1>
                <h2>Id: ${movie._id}</h2>
                <h2>Rating: ${movie.rating}</h2>
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