const ytKey = import.meta.env.VITE_YOUTUBE_KEY;
const tmdbKey = import.meta.env.VITE_TMDB_KEY;

/*
    This function will:
    ✅Fetch the YouTube trailer that matches the movie title and release year from TMDb.
    ✅Retrieve detailed movie information from TMDb, including title, rating, release date, genres, and synopsis.
    ✅Collect crew data from TMDbs database to display directors and writers.
    ✅Extract the top 5 cast members and display their names, roles, and profile images.
    ✅Render all collected information (trailer, details, credits, cast) into the #movie-details container.
    ✅Handle errors by showing a fallback message if data cannot be loaded.
*/


export async function displayTrailer(title, year = "", id) {
    const ytQuery = `${title} ${year} official trailer`.trim();

    try {
        const ytResponse = await fetch(
            `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(ytQuery.toLowerCase())}&type=video&maxResults=1&key=${ytKey}`
        );
        const ytData = await ytResponse.json();
        const videoId = ytData.items?.[0]?.id?.videoId;

        const tmdbResponse = await fetch(
            `https://api.themoviedb.org/3/movie/${id}?api_key=${tmdbKey}`
        );
        const tmdbData = await tmdbResponse.json();

        const creditsResponse = await fetch(
            `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${tmdbKey}`
        );
        const creditsData = await creditsResponse.json();

        const directors = creditsData.crew?.filter(member => member.job === "Director") || [];
        const writers = creditsData.crew?.filter(member =>
            ["Writer", "Screenplay", "Author"].includes(member.job)
        ) || [];
        const topCast = creditsData.cast?.slice(0, 5) || [];

        const container = document.getElementById("movie-details");

        if (videoId) {
            container.innerHTML = `
            <div>
                <h1>${tmdbData.title} (${tmdbData.release_date.split("-")[0]})</h1>
                <div>
                    <p><strong>Rating:</strong> ${tmdbData.vote_average} / 10</p>
                    <p><strong>Release Year:</strong> ${tmdbData.release_date.split("-")[0]}</p>
                </div>
                <iframe
                    width="560" height="315"
                    src="https://www.youtube.com/embed/${videoId}"
                    frameborder="0"
                    allow="autoplay; encrypted-media"
                    allowfullscreen>
                </iframe>
                <div>
                    <h2>Genres</h2>
                    <div>${tmdbData.genres.map(g => `<p>${g.name}</p>`).join("")}</div>
                </div>
                <div>
                    <h2>Synopsis</h2>
                    <p>${tmdbData.overview || "No synopsis available."}</p>
                </div>
                <div>
                    <h2>Director(s)</h2>
                    <div>${directors.map(d => `<p>${d.name}</p>`).join("") || "<p>Not available</p>"}</div>
                </div>
                <div>
                    <h2>Writer(s)</h2>
                    <div>${writers.map(w => `<p>${w.name}</p>`).join("") || "<p>Not available</p>"}</div>
                </div>
                <div>
                    <h2>Main Cast</h2>
                    <div>
                        ${topCast.map(actor => `
                            <div style="margin-bottom:10px;">
                                <img 
                                    src="${actor.profile_path
                    ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                    : 'https://via.placeholder.com/100x150?text=No+Image'}" 
                                    alt="${actor.name}" 
                                    style="width:100px;height:auto;border-radius:5px;"
                                />
                                <p>${actor.name} as ${actor.character}</p>
                            </div>
                        `).join("")}
                    </div>
                </div>
            </div>
            `;
        } else {
            container.innerHTML = "<p>Trailer not found.</p>";
        }
    } catch (err) {
        const container = document.getElementById("movie-details");
        container.innerHTML =
            `<p>${err} : Failed to load movie details. Please try again.</p>`;
    }
}
