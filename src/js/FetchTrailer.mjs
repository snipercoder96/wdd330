const ytKey = import.meta.env.VITE_YOUTUBE_KEY;
const tmdbKey = import.meta.env.VITE_TMDB_KEY;

export async function displayTrailer(title, year = "", id) {
    const ytQuery = `${title} ${year} official trailer`.trim();

    try {
        // YouTube API
        const ytResponse = await fetch(
            `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(ytQuery.toLowerCase())}&type=video&maxResults=1&key=${ytKey}`
        );
        const ytData = await ytResponse.json();
        const videoId = ytData.items?.[0]?.id?.videoId;

        // TMDb movie details
        const tmdbResponse = await fetch(
            `https://api.themoviedb.org/3/movie/${id}?api_key=${tmdbKey}`
        );
        const tmdbData = await tmdbResponse.json();

        // TMDb credits (directors, writers, cast)
        const creditsResponse = await fetch(
            `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${tmdbKey}`
        );
        const creditsData = await creditsResponse.json();

        // Fix 1: Use optional chaining on crew to avoid crash if undefined
        const directors = creditsData.crew?.filter(member => member.job === "Director") || [];
        const writers = creditsData.crew?.filter(member =>
            ["Writer", "Screenplay", "Author"].includes(member.job)
        ) || [];

        // Fix 2: Define topCast from the cast array
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
                <div>
                    ${tmdbData.genres.map(g => `<p>${g.name}</p>`).join("")}</div>
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
                        <p>${actor.name} as ${actor.character}</p>
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