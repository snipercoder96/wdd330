
export function displaySearchResults(movies) {
    const container = document.getElementById("movie-details");
    container.innerHTML = "";

    if (!movies || movies.length === 0) {
        container.innerHTML = "<p>No movies found.</p>";
        return;
    }

    movies.forEach(movie => {
        const card = document.createElement("div");
        card.classList.add("movie-card");

        // TMDb uses title, release_date, poster_path
        const year = movie.release_date ? movie.release_date.split("-")[0] : "N/A";
        const posterUrl = movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "hero.png";

        card.innerHTML = `
            <h3>${movie.title} (${year})</h3>
            <img src="${posterUrl}" alt="${movie.title} poster" />
            <button class="watch-trailer-btn">Watch Trailer</button>
        `;

       
        card.querySelector(".watch-trailer-btn").addEventListener("click", () => {
            window.location.href = `/src/movies_selected/movies-selected.html?id=${movie.id}&title=${encodeURIComponent(movie.title.toLowerCase())}&year=${encodeURIComponent(year)}`;
        });

        container.appendChild(card);
    });
}


// Loads a default set of movies on page load
export async function displayGlobalMovies() {
    const tmdbKey = import.meta.env.VITE_TMDB_KEY;
    const container = document.getElementById("movie-details");
    container.innerHTML = "";

    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=${tmdbKey}&query=iron man`
        );
        const data = await response.json();

        if (!data.results || data.results.length === 0) {
            container.innerHTML = "<p>No movies found.</p>";
            return;
        }

        data.results.forEach(movie => {
            const card = document.createElement("div");
            card.classList.add("movie-card");

            const year = movie.release_date ? movie.release_date.split("-")[0] : "N/A";
            const posterUrl = movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "placeholder.jpg";

            card.innerHTML = `
                <h3>${movie.title || "No title found"} (${year})</h3>
                <img src="${posterUrl}" alt="${movie.title} poster" />
                <button class="watch-trailer-btn">Watch Trailer</button>
            `;

            card.querySelector(".watch-trailer-btn").addEventListener("click", () => {
                window.location.href = `/src/movies_selected/movies-selected.html?id=${movie.id}&title=${encodeURIComponent(movie.title.toLowerCase())}&year=${encodeURIComponent(year)}`;
            });

            container.appendChild(card);
        });

    } catch (err) {
        container.innerHTML = `<p>${err} : Failed to load movies. Please try again.</p>`;
    }
}
