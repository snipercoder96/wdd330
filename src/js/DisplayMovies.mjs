export function displaySearchResults(movies, genreMap) {
    const container = document.getElementById("movie-details");
    container.innerHTML = "";

    if (!movies || movies.length === 0) {
        container.innerHTML = "<p>No movies found.</p>";
        return;
    }

    movies.forEach(movie => {
        const card = document.createElement("div");
        card.classList.add("movie-card");

        const year = movie.release_date ? movie.release_date.split("-")[0] : "N/A";
        const posterUrl = movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "hero.png";

        const genres = movie.genre_ids.map(id => genreMap[id] || "Unknown").join(", ");

        card.innerHTML = `
            <h3>${movie.title} (${year})</h3>
            <img src="${posterUrl}" alt="${movie.title} poster" />
            <p>Genres: ${genres}</p>
            <button class="watch-trailer-btn">Watch Trailer</button>
        `;

        card.querySelector(".watch-trailer-btn").addEventListener("click", () => {
            window.location.href = `/wdd330/src/movies_selected/movies-selected.html?id=${movie.id}&title=${encodeURIComponent(movie.title.toLowerCase())}&year=${encodeURIComponent(year)}`;
        });

        container.appendChild(card);
    });
}

export async function displayGlobalMovies() {
    const tmdbKey = import.meta.env.VITE_TMDB_KEY;
    const container = document.getElementById("movie-details");
    container.innerHTML = "";

    try {
        // Fetch genre dictionary
        const genreResponse = await fetch(
            `https://api.themoviedb.org/3/genre/movie/list?api_key=${tmdbKey}`
        );
        const genreData = await genreResponse.json();
        const genreMap = {};
        genreData.genres.forEach(g => genreMap[g.id] = g.name);

        // Fetch popular movies
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/popular?api_key=${tmdbKey}`
        );
        const data = await response.json();

        if (!data.results || data.results.length === 0) {
            container.innerHTML = "<p>No movies found.</p>";
            return;
        }

        
        displaySearchResults(data.results, genreMap);

    } catch (err) {
        container.innerHTML = `<p>${err} : Failed to load movies. Please try again.</p>`;
    }
}
