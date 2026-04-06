class Movie {
    constructor(title, year, genres, rating) {
        this.title = title;
        this.year = year;
        this.genres = genres;
        this.rating = rating;
    }
}


export function addToFavourites(movie, year, genres) {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    const favMovie = new Movie(movie.title, year, genres, movie.vote_average);

    // Avoid duplicates after saving favorite movies
    const exists = favorites.some(f => f.title === favMovie.title && f.year === favMovie.year);
    if (!exists) {
        favorites.push(favMovie);
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }
    
    //Redirect after yyou save your favorite movie
    window.location.href = "/wdd330/src/Favorites/favorites.html";
}


export function renderFavourites() {
    const list = document.getElementById("favorites-list");
    if (!list) return;

    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (favorites.length === 0) {
        list.innerHTML = "<li>No favourites yet.</li>";
        return;
    }

    list.innerHTML = "";
    favorites.forEach((movie, index) => {
        const item = document.createElement("li");
        item.innerHTML = `
            <strong>${movie.title}</strong> (${movie.year})
            <span>Genres: ${movie.genres}</span>
            <span>Rating: ${movie.rating ?? "N/A"}</span>
            <button class="remove-btn" data-index="${index}">Remove</button>
        `;
        list.appendChild(item);
    });

    // Remove from favourites
    list.addEventListener("click", (e) => {
        if (e.target.classList.contains("remove-btn")) {
            const index = Number(e.target.dataset.index);
            favorites.splice(index, 1);
            localStorage.setItem("favorites", JSON.stringify(favorites));
            renderFavourites(); // Render updated data after removing favorites
        }
    });
}