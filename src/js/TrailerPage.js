// TrailerPage.js — runs on /src/movies_selected/index.html
import { displayTrailer } from "./FetchTrailer.mjs";

const params = new URLSearchParams(window.location.search);
const movieTitle = params.get("title");

if (movieTitle) {
    // Show the title in the heading
    document.getElementById("movie-title").textContent = movieTitle;
    // Auto-load the trailer
    displayTrailer(movieTitle);
} else {
    document.getElementById("trailer").innerHTML = "<p>No movie selected.</p>";
}
