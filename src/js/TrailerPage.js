import { displayTrailer } from "./FetchTrailer.mjs";
import searchBar from "./SearchBar.mjs";

searchBar()

const params = new URLSearchParams(window.location.search);
const movieTitle = params.get("title");
const movieYear = params.get("year");   

if (movieTitle) {
    displayTrailer(movieTitle, movieYear); 
} else {
    document.getElementById("movie-details").innerHTML = "<p>No movie selected.</p>";
}