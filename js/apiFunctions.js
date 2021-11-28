const BASIC_API = "https://moviesmern.herokuapp.com/movies/";
const BY_ID_ENDPOINT = "movie/";
const SEARCH_ENDPOINT = "movie/searchByName/";
const SAVE_MOVIE_ENDPOINT = "saveMovie";

function showLoader(element){
    element.innerHTML += `<img src="../media/loader_Gif.gif" alt="" id="loaderGif">`
}
function stopLoader(){
    loaderGif.style.display="none"
}

async function getFromApi(element, api_Url) {
    try {
        showLoader(element)
        return await fetch(api_Url)
            .then(res => res.json())
    }catch (err) {
        return err
    }
    finally{
        stopLoader()
    }
}

async function restApiById(endPoint, options) {
    try {
        return await fetch(BASIC_API+endPoint, options)
            .then(res => res.json())
    } catch (err) {
        return err;
    }
}