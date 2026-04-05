import { displaySearchResults } from "./DisplayMovies.mjs";
const tmdbKey = import.meta.env.VITE_TMDB_KEY;
console.log("Injected env:", import.meta.env);

export async function fetchMovies(query) {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=${tmdbKey}&query=${encodeURIComponent(query.toLowerCase())}`
        );

        if (!response.ok) {
            document.querySelector("#movie-details").textContent =
                "Failed to fetch movies. Please try again later.";
            return [];
        }

        const data = await response.json();

        // TMDb returns results[], not Search
        if (data.results && data.results.length > 0) {
            displaySearchResults(data.results);
        } else {
            document.querySelector("#movie-details").innerHTML =
                `<p>No results found for "<strong>${query}</strong>".</p>`;
        }

    } catch (err) {
        console.error("Error fetching movies:", err);
        document.querySelector("#movie-details").textContent =
            "Something went wrong. Please try again.";
    }
}
