document.querySelector('video').playbackRate = 0.50;

async function getAllMovies() {
    try {
        return await fetch("https://moviesmern.herokuapp.com/movies/all")
            .then(res => res.json())
    } catch (err) {
        return err
    }
}
getAllMovies()
    .then(res => addMovieToTable(res.data, moviesTable))


function addMovieToTable(arr, table) {
    for (let item of arr) {
        table.innerHTML +=
            `<tr>
                <td>${item._id}</td>
                <td>${item.movieName}</td>
                <td>${item.image}</td>
                <td>${item.synopsis}</td>
                <td><a href=${item.linkToMovie} target="blank">more info</a></td>
                <td>${item.rating}/10</td>
                <td>${item.date}</td>
            </tr>`
    }
}