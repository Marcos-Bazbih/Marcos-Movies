getFromApi(tableBox, BASIC_API+"all")
    .then(res => addMovieToTable(res.data, tableBody))


function addMovieToTable(arr, table) {
    for (let item of arr) {
        table.innerHTML +=
            `<tr class="table-row">
                <td class="table-td">${item._id}</td>
                <td class="table-td">${item.movieName}</td>
                <td class="table-td">${item.image}</td>
                <td class="table-td">${item.synopsis}</td>
                <td class="table-td td-link-box"><a class="table-td-link" href=${item.linkToMovie} target="blank">more info</a></td>
                <td class="table-td">${item.rating}/10</td>
                <td class="table-td">${item.date}</td>
            </tr>`
    }
}