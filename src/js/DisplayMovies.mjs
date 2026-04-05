// Called after a search — renders a clickable list of results
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

        card.innerHTML = `
            <h3>${movie.Title} (${movie.Year})</h3>
            <img src="${movie.Poster !== "N/A" ? movie.Poster : "hero.png"}"
                 alt="${movie.Title} poster" />
            <button class="watch-trailer-btn">Watch Trailer</button>
        `;

        // Navigate to trailer page with movie title as a URL param
        card.querySelector(".watch-trailer-btn").addEventListener("click", () => {
            window.location.href = `/src/movies_selected/movies-selected.html?title=${encodeURIComponent(movie.Title)}`;
        });

        container.appendChild(card);
    });
}


// Loads a default set of movies on page load
export async function displayGlobalMovies() {
    const omdbKey = import.meta.env.VITE_OMDB_KEY;
    const container = document.getElementById("movie-details");
    container.innerHTML = "";

    try {
        const response = await fetch(
            `https://www.omdbapi.com/?s=iron man&apikey=${omdbKey}` 
        );
        const data = await response.json();

        if (!data.Search || data.Search.length === 0) {
            container.innerHTML = "<p>No movies found.</p>";
            return;
        }

        data.Search.forEach(movie => {
            const card = document.createElement("div");
            card.classList.add("movie-card");

            card.innerHTML = `
                <h3>${movie.Title ? movie.Title : `No title found`} (${movie.Year ? movie.Year : ``})</h3>
                <img src="${movie.Poster !== "N/A" ? movie.Poster : "placeholder.jpg"}"
                     alt="${movie.Title} poster" />
                <button class="watch-trailer-btn">Watch Trailer</button>
            `;

            // Navigate to trailer page with movie title as a URL param
            card.querySelector(".watch-trailer-btn").addEventListener("click", () => {
                window.location.href = `/src/movies_selected/movies-selected.html?title=${encodeURIComponent(movie.Title)}&year=${encodeURIComponent(movie.Year)}`;
            });

            container.appendChild(card);
        });

    } catch (err) {
        container.innerHTML = `<p>${err} : Failed to load movies. Please try again.</p>`;
    }
}
