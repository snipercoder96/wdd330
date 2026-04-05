import { displaySearchResults } from "./DisplayMovies.mjs";
const omdbKey = import.meta.env.VITE_OMDB_KEY;
console.log("Injected env:", import.meta.env);




export async function fetchMovies(query) {
    try {
        const response = await fetch(
            `https://www.omdbapi.com/?s=${encodeURIComponent(query)}&apikey=${omdbKey}`
        );

        if (!response.ok) {
            document.querySelector("#movie-details").textContent =
                "Failed to fetch movies. Please try again later.";
            return [];
        }

        const data = await response.json();

        if (data.Response === "True") {
            displaySearchResults(data.Search); 
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
